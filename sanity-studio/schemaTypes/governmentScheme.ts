import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'governmentScheme',
    title: 'Government Scheme',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Scheme Title',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'hi', title: 'Hindi (हिंदी)', type: 'string' },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'text', rows: 4 },
                { name: 'hi', title: 'Hindi (हिंदी)', type: 'text', rows: 4 },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'eligibility',
            title: 'Eligibility Criteria',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'text', rows: 3 },
                { name: 'hi', title: 'Hindi (हिंदी)', type: 'text', rows: 3 },
            ],
        }),
        defineField({
            name: 'documentsRequired',
            title: 'Documents Required',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'text', rows: 3 },
                { name: 'hi', title: 'Hindi (हिंदी)', type: 'text', rows: 3 },
            ],
        }),
        defineField({
            name: 'deadline',
            title: 'Application Deadline',
            type: 'date',
        }),
        defineField({
            name: 'attachment',
            title: 'Application Form / Document',
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
            titleHi: 'title.hi',
            deadline: 'deadline',
            active: 'isActive',
        },
        prepare(selection) {
            const { titleEn, titleHi, deadline, active } = selection
            return {
                title: titleEn,
                subtitle: `${titleHi || ''} ${deadline ? `- ${deadline}` : ''} ${!active ? '(Hidden)' : ''}`.trim(),
            }
        },
    },
})
