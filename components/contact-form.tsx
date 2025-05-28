'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Textarea} from '@/components/ui/textarea'
import {useToast} from '@/components/ui/use-toast'
import {useLanguage} from '@/contexts/language-context'
import {AlertCircle} from 'lucide-react'
import {Alert, AlertDescription} from '@/components/ui/alert'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {toast} = useToast()
  const {t} = useLanguage()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje')
      }

      toast({
        title: t('contact.success'),
        description: t('contact.success.description'),
      })
      e.currentTarget.reset()
    } catch (error) {
      toast({
        title: t('contact.error'),
        description: t('contact.error.description'),
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="name">{t('contact.name')}</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder={t('contact.name.placeholder')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t('contact.email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t('contact.email.placeholder')}
          />
          <Alert
            variant="destructive"
            className="mt-2"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{t('contact.email.warning')}</AlertDescription>
          </Alert>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">{t('contact.subject')}</Label>
          <Input
            id="subject"
            name="subject"
            required
            placeholder={t('contact.subject.placeholder')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">{t('contact.message')}</Label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder={t('contact.message.placeholder')}
            className="min-h-[150px]"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('contact.submitting') : t('contact.submit')}
        </Button>
      </form>
    </div>
  )
}
