# Firebase Studio

to start local server go to the project directory
run command "npm run dev"

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

Here’s a quick guide on how to make changes on your local computer:

Find the Tool's "Blueprint": 
Open the file src/lib/tools.tsx. This file contains an array that defines every tool in your app—its name, description, icon, and the detailed text about it.

To Edit Information: 
Simply change the name, description, or details text for any tool in this file.

To Remove a Tool: 
Delete its entire entry from the tools array in src/lib/tools.tsx. You can also delete the tool's component file from src/components/tools/ to keep your project clean.

To Change a Tool's Logic: 
Find the tool's component file in the src/components/tools/ directory (e.g., tip-calculator.tsx) and edit the code directly.

Create the Component: 
Add a new file for your tool in src/components/tools/, just like the others.

Add it to the List: 
Add a new entry for your tool in src/lib/tools.tsx.

Register the Component: 
Open src/components/tool-renderer.tsx and import your new component, then add it to the toolComponents list.

You can do all of this using any code editor you like (such as VS Code) on your own computer.
