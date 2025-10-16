import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { Button } from '@/components/ui/button'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { useTheme } from '@/lib/theme-provider'

interface MermaidDiagramProps {
  chart: string
  className?: string
}

export function MermaidDiagram({ chart, className = '' }: MermaidDiagramProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [translate, setTranslate] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const { theme } = useTheme()

  // Конфигурация темы Mermaid в зависимости от темы сайта
  const getMermaidThemeConfig = (currentTheme: 'light' | 'dark') => {
    if (currentTheme === 'dark') {
      return {
        theme: 'dark' as const,
        themeVariables: {
          // Основные цвета для темной темы
          primaryColor: '#3b82f6',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#1e40af',
          lineColor: '#64748b',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0f172a',
          background: '#0f172a',
          mainBkg: '#1e293b',
          secondBkg: '#334155',
          tertiaryBkg: '#475569',
          // Цвета для таблиц - все строки одинакового цвета
          section0: '#1e293b',
          section1: '#1e293b',
          section2: '#1e293b',
          section3: '#1e293b'
        }
      }
    } else {
      return {
        theme: 'base' as const,
        themeVariables: {
          // Основные цвета для светлой темы
          primaryColor: '#3b82f6',
          primaryTextColor: '#1f2937',
          primaryBorderColor: '#1e40af',
          lineColor: '#6b7280',
          secondaryColor: '#f3f4f6',
          tertiaryColor: '#ffffff',
          background: '#ffffff',
          mainBkg: '#ffffff',
          secondBkg: '#f9fafb',
          tertiaryBkg: '#f3f4f6',
          // Цвета для таблиц в светлой теме
          section0: '#ffffff',
          section1: '#f9fafb',
          section2: '#f3f4f6',
          section3: '#e5e7eb'
        }
      }
    }
  }

  // Функции управления зумом
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.3))
  }

  const handleResetZoom = () => {
    setZoomLevel(1)
    setTranslate({ x: 0, y: 0 })
  }

  // Функции для перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - translate.x, y: e.clientY - translate.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTranslate({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Обработка колесика мыши для зума
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  useEffect(() => {
    if (!chartRef.current || !chart) return

    let isMounted = true
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    
    setIsLoading(true)
    setHasError(false)
    
    // Очищаем предыдущий контент
    chartRef.current.innerHTML = ''
    
    // Получаем конфигурацию темы
    const themeConfig = getMermaidThemeConfig(theme)
    
    // Проверяем, что Mermaid загружен
    if (typeof mermaid === 'undefined') {
      console.error('Mermaid не загружен')
      setHasError(true)
      setIsLoading(false)
      return
    }
    
    // Принудительно сбрасываем конфигурацию Mermaid
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: themeConfig.theme,
      themeVariables: themeConfig.themeVariables,
      // Настройки для ER диаграмм
      er: {
        useMaxWidth: true
      }
    })

    const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
    
    timeoutId = setTimeout(() => {
      if (!isMounted) return

      mermaid.render(id, chart).then(({ svg }) => {
        if (!isMounted || !chartRef.current) return
        
        chartRef.current.innerHTML = svg
        
        // Применяем базовые стили для SVG
        const svgElement = chartRef.current.querySelector('svg')
        if (svgElement) {
          // Устанавливаем базовые размеры
          svgElement.style.maxWidth = '100%'
          svgElement.style.height = 'auto'
          svgElement.style.display = 'block'
          svgElement.style.margin = '0 auto'
          
          // Принудительно применяем стили для темной темы
          if (theme === 'dark') {
            svgElement.style.backgroundColor = '#0f172a'
            
            // Применяем стили ко всем элементам
            const allElements = svgElement.querySelectorAll('*')
            allElements.forEach((element: any) => {
              if (element.tagName === 'rect' || element.tagName === 'circle' || element.tagName === 'ellipse' || element.tagName === 'polygon') {
                element.style.fill = '#1e293b'
                element.style.stroke = '#475569'
              } else if (element.tagName === 'text') {
                element.style.fill = '#f8fafc'
              } else if (element.tagName === 'path' && element.classList.contains('edgePath')) {
                element.style.stroke = '#64748b'
                element.style.fill = 'none'
              }
            })
          }
        }
        
        if (isMounted) {
          setIsLoading(false)
        }
      }).catch((error) => {
        if (!isMounted) return
        setHasError(true)
        setIsLoading(false)
        if (chartRef.current) {
          chartRef.current.innerHTML = `<div class="text-red-500 text-center py-8">
            <p>Ошибка загрузки диаграммы</p>
            <p class="text-xs mt-2">${error.message}</p>
          </div>`
        }
      })
    }, 100)
    
    // Cleanup функция для предотвращения утечек памяти
    return () => {
      isMounted = false
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [chart, theme])

  return (
    <div className={`relative ${className}`}>
      {/* Панель управления зумом */}
      {!isLoading && !hasError && (
        <div className="absolute top-4 right-4 z-10 flex gap-2 bg-background/90 backdrop-blur-sm rounded-lg p-2 shadow-lg border">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          disabled={zoomLevel <= 0.3}
          className="h-8 w-8 p-0"
        >
          <ZoomOut className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div className="flex items-center px-2 text-sm font-medium min-w-[60px] justify-center text-muted-foreground">
          {Math.round(zoomLevel * 100)}%
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          disabled={zoomLevel >= 3}
          className="h-8 w-8 p-0"
        >
          <ZoomIn className="h-4 w-4 text-muted-foreground" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetZoom}
          className="h-8 w-8 p-0"
        >
          <RotateCcw className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      )}

      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing bg-card border border-border relative rounded-md w-full h-[800px]"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        
        {isLoading && (
          <div className="flex items-center justify-center h-full w-full">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">Загрузка диаграммы...</p>
            </div>
          </div>
        )}
        
        
        {hasError && (
          <div className="flex items-center justify-center h-full w-full min-h-[800px] w-full">
            <div className="text-center">
              <p className="text-red-500 mb-2">Ошибка загрузки диаграммы</p>
              <p className="text-sm text-muted-foreground">Попробуйте обновить страницу</p>
            </div>
          </div>
        )}
        
        <div
          ref={chartRef}
          className="mermaid-diagram"
          style={{
            transform: `scale(${zoomLevel}) translate(${translate.x / zoomLevel}px, ${translate.y / zoomLevel}px)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease',
            display: isLoading ? 'none' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '800px',
            width: '100%',
            padding: '20px'
          }}
        />
      </div>


      {!isLoading && !hasError && (
        <div className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/90 backdrop-blur-sm rounded px-2 py-1 border">
          Используйте колесико мыши для зума, перетаскивайте для перемещения
        </div>
      )}
    </div>
  )
}
