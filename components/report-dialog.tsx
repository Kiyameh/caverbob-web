'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {useToast} from '@/components/ui/use-toast'
import {useLanguage} from '@/contexts/language-context'
import {AlertCircle} from 'lucide-react'
import {Alert, AlertDescription} from '@/components/ui/alert'

export function ReportDialog() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {toast} = useToast()
  const {t} = useLanguage()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      reporterName: formData.get('reporterName'),
      contactInfo: formData.get('contactInfo'),
      caveName: formData.get('caveName'),
      newInfo: formData.get('newInfo'),
      dataSource: formData.get('dataSource'),
    }

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el reporte')
      }

      toast({
        title: t('report.success'),
        description: t('report.success.description'),
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: t('report.error'),
        description: t('report.error.description'),
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button variant="outline">{t('report.button')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('report.title')}</DialogTitle>
          <DialogDescription>{t('report.description')}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reporterName">{t('report.reporter')}</Label>
              <Input
                id="reporterName"
                name="reporterName"
                required
                placeholder={t('report.reporter')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactInfo">{t('report.contact')}</Label>
              <Input
                id="contactInfo"
                name="contactInfo"
                required
                placeholder={t('report.contact.placeholder')}
              />
              <Alert
                variant="destructive"
                className="mt-2"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {t('report.contact.warning')}
                </AlertDescription>
              </Alert>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="caveName">{t('report.cave')}</Label>
              <Input
                id="caveName"
                name="caveName"
                required
                placeholder={t('report.cave')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newInfo">{t('report.info')}</Label>
              <Textarea
                id="newInfo"
                name="newInfo"
                required
                placeholder={t('report.info')}
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dataSource">{t('report.source')}</Label>
              <Input
                id="dataSource"
                name="dataSource"
                required
                placeholder={t('report.source')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('report.submitting') : t('report.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
