(function() {

var invalidKeys = [13]; // enter
var oldValue, selection, range;

Polymer({

  __doc__: {
    element: 'input-string',
    description: 'Input element for string data type.',
    status: 'alpha',
    url: 'https://github.com/arodic/input-string/',
    demo: 'http://arodic.github.com/input-string/',
    attributes: [
      { name: 'value', type: 'string', description: 'Input value.' },
      { name: 'editable', type: 'boolean', description: 'Determines if the input can be edited.' }
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

  value: '',
  editable: true,
  ready: function() {
    this.setAttribute('tabindex', 0);
    this.setAttribute('contenteditable', true);
    this.setAttribute('spellcheck', false);
    this.addEventListener('keydown', this.onKeydown.bind(this));
    this.addEventListener('focus', this.onFocus.bind(this));
    this.addEventListener('blur', this.onBlur.bind(this));
  },
  onKeydown: function(event) {
    if (!this.editable || invalidKeys.indexOf(event.which) != -1) {
      event.preventDefault();
      return;
    }
    this.updateValue();
  },
  onFocus: function(event) {
    setTimeout(function(){ // TODO: unhack
      selection = window.getSelection();
      selection.removeAllRanges();
      range = document.createRange();
      range.selectNodeContents(this);
      selection.addRange(range);
      this.focused = true;
    }.bind(this),100);
  },
  onBlur: function() {
    this.value = this.textContent;
    selection = window.getSelection();
    selection.removeAllRanges();
    this.focused = false;
  },
  updateValue: function() {
    oldValue = this.value;
    this.value = this.textContent;
    if (this.value != oldValue) this.fire('input-changed', { input: this });
  },
  valueChanged: function () {
    if (!this.focused) this.textContent = this.value;
  }
});

})();
