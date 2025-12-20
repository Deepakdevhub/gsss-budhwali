import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'galleryImage',
    title: 'Gallery Image',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Image Title',
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
                { name: 'en', title: 'English', type: 'text', rows: 3 },
                { name: 'hi', title: 'Hindi (हिंदी)', type: 'text', rows: 3 },
            ],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Events', value: 'events' },
                    { title: 'Infrastructure', value: 'infrastructure' },
                    { title: 'Activities', value: 'activities' },
                    { title: 'Awards', value: 'awards' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Photo Date',
            type: 'date',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'isHighlighted',
            title: 'Featured Photo',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'title.en',
            titleHi: 'title.hi',
            media: 'image',
            category: 'category',
            date: 'date',
        },
        prepare(selection) {
            const { title, titleHi, media, category, date } = selection
            return {
                title: title,
                subtitle: `${category?.toUpperCase() || ''} - ${date} (${titleHi})`,
                media: media,
            }
        },
    },
})
