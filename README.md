# files-from-template

`files-from-template` is a simple cli application to create files using handlebars templates.

You don't have to install it. Just create your `config-files` and your `template-files`, then execute:

```
npx files-from-template --config-files="./path/to/config/files"
```

A config file is a `JSON` file that teach `files-from-template` how to create the output file.

It is pretty simple, but it must have at least two keys: `templateFilePath` and `outputFilePath`. An optional key `template` may be used to replace handlebars variables. See bellow:

```json
{
  "templateFilePath": "./path-to-the-template-file.hbs",
  "outputFilePath": "./path-to-the-output-file.ext",
  "ask": ["anyVariable1", "anyVariable2"],
  "template": {
    "anyVariable1": "realVariable1",
    "anyVariable2": "realVariable2",
    "anyVariable3": "realVariable3",
  }
}
```

- **templateFilePath** (*required*): path to the template file to be used
- **outputFilePath** (*required*): path to the output file. You can using any extension you'd like
- **ask** (*optional*): an array of strings that will be used as variables for handlebars. Answers provided by the user will be used as values for these variables. For example, you may want to create a filename only on execution time, then use this option. The script will stop, ask a value for the key, and only continues when you provide the value. Every location you use that variable will have the same value you provided when asked.
- **template** (*optional*): any variable you use on your template file. The keys are the name of the variables you create on your handlebars template. For example: `{{ anyVariable1 }}` will be compiled to `realVariable1` in the example above. Keep in mind that `ask` keys will overwrite this option.

If you dont want to specify a `template` with the variables to replace, you can also add your variable names and real names via command. Like so:

```sh
npx files-from-template --config-files="./path/to/config/files" --anyVariable1="realVariable1" --anyVariable2="realVariable2" --anyVariable3="realVariable3"
```

The example above is exactly the same as:

```json
"template": {
  "anyVariable1": "realVariable1",
  "anyVariable2": "realVariable2",
  "anyVariable3": "realVariable3",
}
```

Be aware that command line arguments have higher priority than "`templates`". So they will overwrite variables with the same key in "templates".

## Example 1

I will create a folder called `.files-from-template` in my root directory. Then I'll create a `config-files` folder and a `template-files` folder in it.

My folder structure for this example is:

```
.files-from-template
  config-files
    config-file-example-1.json
    config-file-example-2.json
  template-files
    template-file-example-1.hbs
    template-file-example-2.hbs
```

You don't have to use that same folder structure, but I think it's pretty organized.

Let's see the file contents:

**Config file 1**: `.files-from-template/config-files/config-file-example-1.json`
```json
{
  "templateFilePath": "./.files-from-template/template-files/template-file-example-1.hbs",
  "outputFilePath": "./src/temp-output/output-file1.js"
}
```

As you can see, I'm not specifying a `template` key with variables, so I'll have to send it via command line arguments.

This is the template file:

**Template file 1**: `.files-from-template/template-files/template-file-example-1.hbs`
```hbs
let {{ counter }} = {{ counterValue }};

while ({{ counter }} < {{ counterMax }}) {
  console.log({{ counter }});
  {{ counter }}++;
}
```

Now, if I run that command:

```
npx files-from-template --config-files=".files-from-template/config-files" --counter="counter" --counterValue=0 --counterMax=10
```

My output file will be:

**Output file 1**: `src/temp-output/output-file1.js`
```javascript
let counter = 0;

while (counter < 10) {
  console.log(counter);
  counter++;
}
```

## Example 2

I'm using the same folder structure I used in example 1. Let's take a look at the files.

**Config file 2**: `.files-from-template/config-files/config-file-example-2.json`
```json
{
  "templateFilePath": "./.files-from-template/template-files/template-file-example-2.hbs",
  "outputFilePath": "./src/temp-output/output-file2.tsx",
  "template": {
    "componentName": "ParentComponent",
    "anotherComponentName": "ChildComponent",
    "text": "Hello world!"
  }
}
```

Note that I'm using `template` now, so I don't have to send any variables via command line argument. But now I'm restricted to those values in `template`. You can mix template and command line arguments if you wish to (we'll talk about it in a minute).

**Template file 2** - `.files-from-template/template-files/template-file-example-2.hbs`

```hbs
import { {{ anotherComponentName }} } from './any-module';

export const {{ componentName }} = () => {
  return (
    <{{ anotherComponentName }}>
      <h1>{{ text }}</h1>
    </{{ anotherComponentName }}>
  );
};
```

The command:

```
npx files-from-template --config-files=".files-from-template/config-files"
```

The output:

```tsx
import { ChildComponent } from './any-module';

export const ParentComponent = () => {
  return (
    <ChildComponent>
      <h1>Hello world!</h1>
    </ChildComponent>
  );
};
```

As I told you above, you can use a mix of "template" and command line arguments. In that case, that would be better. When I run the command above (without variables), my files are compiled normally, but the first example breaks because handlebars won't find any value for the variables `counter`, `counterValue` and `counterMax`. That will make the output file from the first example really strange:

Strange looking file:
```
let  = ;

while ( < ) {
  console.log();
  ++;
}
```

So, I can use the same command for both, example 1 and 2:

```
npx files-from-template --config-files=".files-from-template/config-files" --counter="counter" --counterValue=0 --counterMax=10
```

And both files will be perfectly created. That is the advantage of using a mix a template variables and command line arguments.


Output 1:
```javascript
let counter = 0;

while (counter < 10) {
  console.log(counter);
  counter++;
}
```

And output 2:
```tsx
import { ChildComponent } from './any-module';

export const ParentComponent = () => {
  return (
    <ChildComponent>
      <h1>Hello world!</h1>
    </ChildComponent>
  );
};
```

You can add as many config files and template files you'd like. Each config file will generate an output file. This may save you time when creating the same files over and over again, as React Components, Storybook files, styled components files, test files, css files, etc...

## Variables for `templateFilePath` and `outputFilePath`

You can use variable in the config files to. Take the example bellow using the GNU date command (normally for Linux Systems, but you can use whatever command you'd like).

Config file:

```json
{
  "templateFilePath": "./.files-from-template/template-files/template-file-example-1.hbs",
  "outputFilePath": "./src/temp-output/{{ date }}.js"
}
```

Now I have to provide a value for "date" variable. I'm going to use the GNU Date, so every seconds I run files-from-template I get a new file output.

```
npx files-from-template --config-files="./.files-from-template/config-files" --date=`date +"%Y-%m-%d-%H-%M-%S"`
```

The output files would look like: `2021-04-12-21-37-15.js`.

Note that `date +"%Y-%m-%d-%H-%M-%S"` is the command I used to produce the date value, it has nothing to do with files-from-template, but [GNU Core Utilities](https://www.gnu.org/software/coreutils/). If you are on Linux, just run `date +"%Y-%m-%d-%H-%M-%S"` on your terminal and you'll see what I'm talking about.

## npm scripts

Cleanest way to use files-from-template is using npm scripts. Just add a script to your package.json and use "npm run script-name". For example:

**Install**:

```
npm i -D files-from-template
```

Add to package.json (the command is just an example):

```json
{
  // ...
  "scripts": {
    "test": "npm test",
    "start": "node ./index.js",
    "fft:example": "files-from-template --config-files='.files-from-template/config-files' --var1='val1' --var2='val2' --date=`date +%Y-%m-%d-%H-%M-%S`"
    // ...
  }
  // ...
}
```

Now just run:

```
npm run fft:example
```

If you want to pass command arguments to fft:

```
npm run fft:example -- --arg1='val1' --arg2='val2'
```

## Ask option

Ask is just an array of strings that will be used as variables for handlebars. Ask will overwrite any other method you use for creating variables. For example:

```json
{
  "templateFilePath": "./template-files/template-file-example-2.hbs",
  "outputFilePath": "./src/output/{{ componentName }}",
  "ask": ["componentName"],
  "template": {
    "componentName": "ParentComponent",
    "anotherComponentName": "ChildComponent",
    "text": "Hello world!"
  }
}
```

In the example above, `ask` will have greater priority than `template`, so the value of `componentName` will come from "ask". The value `ParentComponent` WILL NOT be used. Same for `--componentName` option via command line, `ask` will overwrite every other option to respect what the user wants.

## Command arguments

The best way to use command line arguments is: `--keyName="TheValue" --anotherKey="123456"`. As mentioned before, this will result in an object like:

```javascript
{
  keyName: "TheValue",
  anotherKey: 123456
}
```

It is intuitive and easy to use. But you can also send keys without values.

Say you write a command like:

```
npx files-from-template --config-files="./config-files" --keyName="TheValue" --anotherKey="123456" argumentOne argumentTwo argumentThree
```

Note the `argumentOne argumentTwo argumentThree` part. Those arguments dont have any value or "--". They will result in an array called `ordered` in the resulting object. The values can also be used in handlebars.

```javascript
{
  keyName: "TheValue",
  anotherKey: 123456,
  ordered: ["argumentOne", "argumentTwo", "argumentThree"]
}
```

To use these values in your template file, you can use this syntax:

```handlebars
First ordered value -> {{ ordered.[0] }} -> Will resolve to argumentOne
Second ordered value -> {{ ordered.[1] }} -> Will resolve to argumentTwo
Third ordered value -> {{ ordered.[2] }} -> Will resolve to argumentThree
```

A real example:

Command:
```
npx files-from-template --config-files="./config-files" counter 0 20
```

Template File:
```handlebars
let {{ ordered.[0] }} = {{ ordered.[1] }};

while ({{ ordered.[0] }} < {{ ordered.[2] }}) {
  console.log({{ ordered.[0] }});
  {{ ordered.[0] }}++;
}
```

Output file:
```javascript
let counter = 0;

while (counter < 20) {
  console.log(counter);
  counter++;
}
```

As far as I'm concerned, it is way less intuitive. But works =).
