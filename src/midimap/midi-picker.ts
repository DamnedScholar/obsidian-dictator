import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian'

// Populate a selection modal with accessible MIDI devices.

export class MIDIPicker extends Modal {
	constructor(app: App) {
		super(app)
	}

	onOpen() {
		const {contentEl} = this
	}

	onClose() {
		const {contentEl} = this
		contentEl.empty()
	}
}
