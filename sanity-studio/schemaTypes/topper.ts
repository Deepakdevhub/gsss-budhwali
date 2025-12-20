import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'topper',
    title: 'Topper / Star Performer',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'object',
            fields: [
                { name: 'en', type: 'string', title: 'English' },
                { name: 'hi', type: 'string', title: 'Hindi' }
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Important for SEO and accessibility'
                }
            ],
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'percentage',
            title: 'Percentage / Grade',
            type: 'string',
            description: 'E.g., "95.6%" or "A+"',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'year',
            title: 'Year / Class',
            type: 'string',
            description: 'E.g., "2024" or "Class 12th"',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'achievement',
            title: 'Achievement',
            type: 'object',
            fields: [
                { name: 'en', type: 'text', title: 'English' },
                { name: 'hi', type: 'text', title: 'Hindi' }
            ]
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Academic', value: 'academic' },
                    { title: 'Sports', value: 'sports' },
                    { title: 'Cultural', value: 'cultural' },
                    { title: 'Overall', value: 'overall' }
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first',
            validation: Rule => Rule.required().min(0)
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        })
    ],
    preview: {
        select: {
            title: 'name.en',
            subtitle: 'year',
            media: 'photo'
        }
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'displayOrderAsc',
            by: [{ field: 'displayOrder', direction: 'asc' }]
        }
    ]
})
