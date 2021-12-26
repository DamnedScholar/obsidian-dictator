import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian'

import midi from 'midi'

import { MIDIPicker } from 'midimap/midi-picker'

// Remember to rename these classes and interfaces!

interface DictatorSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: DictatorSettings = {
	mySetting: 'default'
}

const inputDevice = midi.Input()

export default class Dictator extends Plugin {
	settings: DictatorSettings
	midi: null

	async onload() {
		await this.loadSettings()

		console.log("Obsidian Dictator :> Conducting a coup.")

		// await this.acquireMIDI()

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('dice', 'Obsidian Dictator', (evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('Main recorder UI will appear when this button is pressed.');
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('dictator-ribbon-class');

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		this.statusBarItemEl = this.addStatusBarItem();
		this.statusBarItemEl.setText('Obsidian Dictator Engaged.');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-midi-picker',
			name: 'Open MIDI device picker',
			callback: () => {
				
			}
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// this.midi ?
		// 	this.midi.onstatechange = function(e) {
		// 		// Print information about the (dis)connected MIDI controller
		// 		console.log(e.port.name, e.port.manufacturer, e.port.state);
		// 	} : console.log("Obsidian Dictator :> Something is wrong with the MIDI.")

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		// this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
		// 	console.log('click', evt);
		// });

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		// this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {

	}

	thisIsNeverCalled() {
		console.log(inputDevice.getPortCount())
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// async acquireMIDI() {
	// 	function onMIDISuccess( midiAccess ) {
	// 		console.log( "Obsidian Dictator :> MIDI ready!" )
			
	// 		return midiAccess  // store in the global (in real usage, would probably keep in an object instance)
	// 	}
	
	// 	function onMIDIFailure(msg) {
	// 		console.log( "Obsidian Dictator :> Failed to get MIDI access - " + msg )

	// 		return null
	// 	}
	
	// 	this.midi = navigator.requestMIDIAccess().then( onMIDISuccess, onMIDIFailure )
	// }
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: Dictator;

	constructor(app: App, plugin: Dictator) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
