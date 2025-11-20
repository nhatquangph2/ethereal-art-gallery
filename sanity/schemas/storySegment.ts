import { defineType, defineField } from 'sanity';

export const storySegment = defineType({
  name: 'storySegment',
  title: 'Story Segment',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Narrative Text',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audioLayer',
      title: 'Audio Layer',
      type: 'file',
      options: {
        accept: 'audio/*',
      },
      description: 'Optional audio layer that plays when this segment is in view',
    }),
    defineField({
      name: 'imageEffect',
      title: 'Image Effect',
      type: 'string',
      options: {
        list: [
          { title: 'Zoom In Center', value: 'zoom_in_center' },
          { title: 'Zoom Out', value: 'zoom_out' },
          { title: 'Pan Left', value: 'pan_left' },
          { title: 'Pan Right', value: 'pan_right' },
          { title: 'Pan Up', value: 'pan_up' },
          { title: 'Pan Down', value: 'pan_down' },
          { title: 'Pan Left Down', value: 'pan_left_down' },
          { title: 'Pan Right Up', value: 'pan_right_up' },
          { title: 'Rotate Subtle', value: 'rotate_subtle' },
          { title: 'Scale Breathe', value: 'scale_breathe' },
        ],
        layout: 'dropdown',
      },
      description: 'Animation effect applied to the image when this segment is in view',
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      description: 'How long this segment should be in view (optional)',
    }),
  ],
  preview: {
    select: {
      text: 'text',
      effect: 'imageEffect',
    },
    prepare({ text, effect }) {
      return {
        title: text?.substring(0, 50) + '...',
        subtitle: effect || 'No effect',
      };
    },
  },
});
