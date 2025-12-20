import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'notice',
    title: 'Notice',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Notice Title',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'hi', title: 'Hindi (हिंदी)', type: 'string' },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Notice Content',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'text', rows: 6 },
                { name: 'hi', title: 'Hindi (हिंदी)', type: 'text', rows: 6 },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Admissions', value: 'admissions' },
                    { title: 'Exams', value: 'exams' },
                    { title: 'Events', value: 'events' },
                    { title: 'Schemes', value: 'schemes' },
                    { title: 'General', value: 'general' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isUrgent',
            title: 'Mark as Urgent',
            type: 'boolean',
            description: 'Urgent notices appear in ticker and are highlighted',
            initialValue: false,
        }),
        defineField({
            name: 'attachment',
            title: 'Attachment',
            type: 'file',
        }),
        defineField({
            name: 'externalLink',
            title: 'External Link',
            type: 'url',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'expiresAt',
            title: 'Expiry Date',
            type: 'datetime',
        }),
        defineField({
            name: 'isActive',
            title: 'Show on Website',
            type: 'boolean',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            titleEn: 'title.en',
            category: 'category',
            urgent: 'isUrgent',
            active: 'isActive',
            date: 'publishedAt',
        },
        prepare(selection) {
            const { titleEn, category, urgent, active, date } = selection
            const formattedDate = date ? new Date(date).toLocaleDateString() : ''
            return {
                title: titleEn,
                subtitle: `${category?.toUpperCase() || ''}${urgent ? ' - 🔔 URGENT' : ''} ${!active ? '(Hidden)' : ''} - ${formattedDate}`.trim(),
            }
        },
    },
})
