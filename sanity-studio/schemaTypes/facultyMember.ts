import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'facultyMember',
    title: 'Faculty Member',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Teacher Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subject',
            title: 'Subject',
            type: 'object',
            fields: [
                { name: 'en', title: 'English', type: 'string' },
                { name: 'hi', title: 'Hindi (हिंदी)', type: 'string' },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'qualification',
            title: 'Qualification',
            type: 'string',
        }),
        defineField({
            name: 'experience',
            title: 'Years of Experience',
            type: 'number',
            validation: (Rule) => Rule.min(0).max(50),
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'email',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number',
            description: 'Lower numbers appear first (1, 2, 3, ...)',
            validation: (Rule) => Rule.required().min(1).integer(),
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
            title: 'name',
            subjectEn: 'subject.en',
            subjectHi: 'subject.hi',
            media: 'photo',
            order: 'displayOrder',
            active: 'isActive',
        },
        prepare(selection) {
            const { title, subjectEn, subjectHi, media, order, active } = selection
            return {
                title: title,
                subtitle: `${subjectEn} (${subjectHi}) - Order: ${order} ${!active ? '(Hidden)' : ''}`,
                media: media,
            }
        },
    },
})
