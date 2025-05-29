'use client'

import {useMeasurement} from '@/contexts/measurement-context'
import {useLanguage} from '@/contexts/language-context'
import {Ruler} from 'lucide-react'
import {cn} from '@/lib/utils'

interface MeasurementToggleProps {
  className?: string
  compact?: boolean
}

export function MeasurementToggle({
  className,
  compact = false,
}: MeasurementToggleProps) {
  const {toggleSystem, system} = useMeasurement()
  const {t} = useLanguage()

  // Get the display text based on the current system and language
  const displayText =
    system === 'metric' ? t('measurement.metric') : t('measurement.imperial')

  if (compact) {
    return (
      <button
        onClick={toggleSystem}
        className={cn(
          'flex items-center justify-center h-10 w-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-200',
          system === 'imperial' && 'bg-primary-foreground/20',
          className
        )}
        aria-label={`Toggle to ${
          system === 'metric' ? 'imperial' : 'metric'
        } units`}
        title={`${t('measurement.metric')}: ${displayText}`}
      >
        <div className="flex flex-col items-center ">
          <Ruler className="h-4 w-4" />
          <span className="text-[11px] leading-none mt-0.5">
            {system === 'metric' ? 'Met' : 'Imp'}
          </span>
        </div>
      </button>
    )
  }

  return (
    <button
      onClick={toggleSystem}
      className={cn(
        'flex items-center px-3 py-1.5 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-200 border border-primary-foreground/20',
        system === 'imperial' && 'bg-primary-foreground/20',
        className
      )}
      aria-label={`Toggle to ${
        system === 'metric' ? 'imperial' : 'metric'
      } units`}
    >
      <Ruler className="h-4 w-4 mr-1.5" />
      <span>{displayText}</span>
    </button>
  )
}
