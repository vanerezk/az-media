// Prices as published on the previous site. Update them here only.

export const pricing = [
  {
    id: 'photography',
    title: 'Photography',
    lead: 'Every photo package includes sky replacement.',
    image: 'kitchen-wood-island',
    columns: ['Property size', 'Price'],
    rows: [
      ['0 – 1,500 sq ft', '$199'],
      ['1,501 – 2,500 sq ft', '$249'],
      ['2,501 – 3,500 sq ft', '$299'],
      ['3,501 – 4,500 sq ft', '$349'],
    ],
    notes: ['Also available: 4,501 – 6,000 sq ft ($399) and 6,001 – 8,000 sq ft ($499).'],
  },
  {
    id: 'video',
    title: 'Video',
    lead: 'From quick social reels to story-driven films.',
    image: 'on-set-video',
    groups: [
      {
        title: 'Social media reel',
        text: 'A dynamic mini-tour designed to spark interest and drive engagement.',
        columns: ['Property size', 'Price'],
        rows: [
          ['0 – 2,000 sq ft', '$149'],
          ['2,001 – 4,000 sq ft', '$399'],
          ['4,001 – 6,000 sq ft', '$449'],
        ],
        notes: ['Add $100 to feature the agent on camera.'],
      },
      {
        title: 'HD home video',
        text: "A crisp, cinematic walkthrough of the property's design, flow and atmosphere.",
        columns: ['Property size', 'Price'],
        rows: [
          ['1,501 – 2,500 sq ft', '$349'],
          ['2,501 – 3,500 sq ft', '$449'],
          ['3,501 – 4,500 sq ft', '$549'],
        ],
        notes: ['Other sizes available on request.'],
      },
      {
        title: 'Cinematic video tour',
        text: "A polished, story-driven film that highlights a property's character, mood and lifestyle.",
        columns: ['Property size', 'Price'],
        rows: [
          ['1,501 – 2,500 sq ft', '$499'],
          ['2,501 – 3,500 sq ft', '$599'],
          ['3,501 – 4,500 sq ft', '$699'],
        ],
        notes: ['Also available: up to 1,500 sq ft ($499), 4,501 – 6,000 sq ft ($799) and 6,001 – 8,000 sq ft ($899).'],
        youtube: {id: 'zEUmnZNX46o', title: 'Cinematic video tour example'},
      },
    ],
  },
  {
    id: 'aerial',
    title: 'Aerial',
    lead: "Drone photos and video that reveal a property's surroundings, scale and setting.",
    image: 'aerial-lake-community',
    columns: ['Package', 'Price'],
    rows: [
      ['12 images', '$199'],
      ['24 images', '$249'],
      ['Aerial video tour', '$199'],
    ],
    notes: ['Add lot lines and location markers to your video for $99.'],
  },
  {
    id: 'floor-plans',
    title: '2D & 3D floor plans',
    lead: "Accurate plans that help buyers understand a property's layout and potential.",
    image: 'floor-plan',
    columns: ['Package', 'Price'],
    rows: [
      ['2D floor plan', '$99'],
      ['3D floor plan', '$149'],
      ['2D floor plan, 4,000+ sq ft', '$150'],
      ['2D & 3D floor plans', '$199'],
    ],
  },
];

export const addOns = [
  {title: 'Twilight photos', price: '$299', image: 'twilight-garage'},
  {title: 'Virtual twilight', price: '$39 / image', image: 'twilight-virtual'},
  {title: 'Virtual staging', price: '$49 / image', image: 'staging-after'},
  {title: 'Aerial photos, 6 – 12', price: '$99', image: 'aerial-backyard'},
  {title: 'Aerial photos, 13 – 24', price: '$149', image: 'aerial-foothills'},
];
