'use babel';

import AtomCoderView from './atom-coder-view';
import { CompositeDisposable } from 'atom';

export default {

  atomCoderView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomCoderView = new AtomCoderView(state.atomCoderViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomCoderView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-coder:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomCoderView.destroy();
  },

  serialize() {
    return {
      atomCoderViewState: this.atomCoderView.serialize()
    };
  },

  toggle() {
    console.log('AtomCoder was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
