Polymer({

  __doc__: {
    element: 'input-array',
    description: 'Input element for numeric array data type.',
    status: 'alpha',
    url: 'https://github.com/arodic/input-array/',
    demo: 'http://arodic.github.com/input-array/',
    attributes: [
      { name: 'value', type: 'array', description: 'Input value.' },
      { name: 'min', type: 'number', description: 'Minimum value.' },
      { name: 'max', type: 'number', description: 'Maximum value.' },
      { name: 'step', type: 'number', description: 'Value increment when dragging in powers of 10.' },
      { name: 'editable', type: 'boolean', description: 'Determines if the input can be edited.' }
    ],
    properties: [],
    methods: [],
    events: [
      {
        name: 'input-changed',
        description: 'Fires when value attribute is changed or mutated.'
      }
    ]
  },

  min: -Infinity,
  max: Infinity,
  step: -2,
  value: [0,0,0],
  editable: true,
  ready: function() {
    this.components = [];
    this.shadowRoot.addEventListener('input-changed', this.onInputChanged.bind(this));
  },
  attached: function() {
    this.valueChanged();
  },
  onInputChanged: function(event) {
    event.stopPropagation();
    this.fire('input-changed', { input: this, component: this.components.indexOf(event.detail.input) });
  },
  valueChanged: function() {

    if (this.previousValue == this.value) return;

    this.innerHTML = '';

    for (var i = 0; i < this.value.length; i++) {

      if (this.components[i]) this.components[i].unbindAll();

      var type = null;
      
      if (typeof this.value[i] == "boolean") type = "input-boolean";
      else if (typeof this.value[i] == "number") type = "input-number";
      else if (typeof this.value[i] == "string") type = "input-string";
      else if (this.value[i] instanceof Float32Array || this.value[i] instanceof Array) type = "input-array";

      if (type) {
        this.components[i] = document.createElement(type);
        this.components[i].setAttribute('flex', true);
        this.components[i].bindProperty('value', new PathObserver(this.value, '['+i+']'));
        this.components[i].bindProperty('min', new PathObserver(this, 'min'));
        this.components[i].bindProperty('max', new PathObserver(this, 'max'));
        this.components[i].bindProperty('step', new PathObserver(this, 'step'));
        this.components[i].bindProperty('editable', new PathObserver(this, 'editable'));
        this.appendChild(this.components[i]);
      }

    }
    this.previousValue = this.value;
  }
});
