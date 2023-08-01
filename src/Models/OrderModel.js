export const AdditionalWorkModel = {
  title: '',
  tz:'',
  hh: '',
  price: '',
  end: '',
};

export const OrderModel = {
    uid: '',
    title: '',
    ref: '',
    tz: {
      text: '',
      comments: [],
      approve: '',
    },
    research: {
      text: '',
      comments: [],
      approve: '',
    },
    figma: {
      text: '',
      approve: '',
    },
    functional: {
      text: '',
      approve: '',
      comments: [],
    },
    concept: {
      text: '',
      files: [],
      approve: '',
      comments: [],
    },
    content: {
      text: '',
      files: [],
      approve: '',
      comments: [],
    },
    paymentStages: {
      '1':  {
        value: '35',
        success: false,
      },
      '2': {
        value: '65',
        success: false,
      }
    },
    execution: '',
    contract: {
      files: [],
      comments: [],
      approve:'',
    },
    videos: [],
    plan: {
      text: '',
      approve: '',
      comments: []
    },
    end: {
      text: '',
      approve: ''
    },
    desiredDates: '',
    desiredPrice: '',
    price: {
        text: '',
        approve: ''
    },
    priority: 'ASAP',
    hh: '',
    comments: '',
    id: '', 
    dateCreating: '',
    additionalWork: AdditionalWorkModel,
    stage: '0',
    active: true,
    subscribe: '',
};

