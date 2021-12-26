# Obsidian Dictator

Besides just sounding cool, this is an in-development plugin intended to add more control granularity to Obsidian's recording capabilities and provide access to external MIDI signals.

## Structure

This plugin is in heavy development and could change at any moment. Here's the current draft of how I imagine the code will be structured:

- `src/midimap` - MIDI mapping capabilities.
  - `src/midimap/midimap` - Render a keymap UI in settings that allows users to bind key codes and gestures to internal commands. Might include some defaults.
  - `src/midimap/device-picker` - UI for choosing which MIDI device to listen to for MIDI signals.
- `src/recorder/recorder` - UI for advanced recorder features.

## Challenges

MIDI input is fuzzy. Some qualities of the input are hard for a user to control with precision (velocity of a key press) and can't be relied on for command activation, but there are some potential uses for being able to sense and record such things.

## Roadmap

- Status bar updates with recording duration. [High]
- MIDI message receipt with configurable command triggers (this plugin's commands will be bound by default). [High]
- Waveform visualization widget in Obsidian (toggleable, off by default). [Medium]
- Sidebar with details about recordings in active note. [Low]

## How to use

- Clone this repo.
- `npm i` or `yarn` to install dependencies
- `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## Improve code quality with eslint (optional)

- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code. 
- To use eslint with this project, make sure to install eslint from terminal:
  - `npm install -g eslint`
- To use eslint to analyze this project use this command:
  - `eslint main.ts`
  - eslint will then create a report with suggestions for code improvement by file and line number.
s- If your source code is in a folder, such as `src`, you can use eslint with this command to analyze all files in that folder:
  - `eslint .\src\`

## Documentation

### Audio

#### Web MIDI

- [Web MIDI API](https://webaudio.github.io/web-midi-api/)

### Obsidian

- [Obsidian API](https://github.com/obsidianmd/obsidian-api)
