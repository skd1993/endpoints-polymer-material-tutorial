(function() {

var validKeys = [13, 32]; // enter, spacebar

Polymer({

  __doc__: {
    element: 'input-boolean',
    description: 'Input element for boolean data type.',
    status: 'alpha',
    url: 'https://github.com/arodic/input-boolean/',
    demo: 'http://arodic.github.com/input-boolean/',
    attributes: [
      { name: 'value', type: 'boolean', description: 'Input value.' },
      { name: 'editable', type: 'boolean', description: 'Determines if the input can be edited.' },
      { name: 'trueStr', type: 'string', description: 'String to display when value is true.    ' },
      { name: 'falseStr', type: 'string', description: 'String to display when value is false.' }
    ],
    properties: [],
    methods: [],
    events: [
      {
        name: 'input-changed',
        description: 'Fires when value is changed.'
      }
    ]
  },

  value: false,
  editable: true,
  trueStr: 'true',
  falseStr: 'false',
  ready: function() {
    this.setAttribute('tabindex', 0);
    this.addEventListener('keydown', this.onKeydown.bind(this));
    this.addEventListener('click', this.onClick.bind(this));
  },
  onClick: function() {
    if (!this.editable) return;
    this.toggle();
  },
  onKeydown: function() {
    if (!this.editable || validKeys.indexOf(event.which) == -1) return;
    this.toggle();
  },
  toggle: function() {
    this.value = !this.value;
    this.fire('input-changed', { input: this });
  }
});

})();
