import { defineType, defineField } from 'sanity';

export const artwork = defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g., Oil on Canvas, Digital Art, Mixed Media',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g., 120 × 180 cm',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'baseImage',
      title: 'Full Resolution Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audioAmbient',
      title: 'Ambient Audio Loop',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'dominantColors',
      title: 'Dominant Colors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'hex',
              title: 'Hex Color',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'storySegments',
      title: 'Story Segments',
      type: 'array',
      of: [{ type: 'storySegment' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which artworks appear in the gallery',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist',
      media: 'thumbnailImage',
      published: 'published',
    },
    prepare({ title, artist, media, published }) {
      return {
        title,
        subtitle: `${artist} ${published ? '✅' : '⏸️'}`,
        media,
      };
    },
  },
});
