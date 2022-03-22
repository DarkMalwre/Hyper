import {Widget} from '@hyper-stack/terminal';

const languages = [
	'TypeScript',
	'JavaScript',
	'C#',
	'C++',
	'Python',
	'PHP',
	'Ruby',
	'Go',
	'Rust',
	'Scala',
	'Swift',
	'Kotlin',
	'Dart',
	'Java',
	'C',
	'CoffeeScript',
	'Haskell',
	'F#',
	'Clojure',
	'Elm',
	'Erlang',
	'Elixir',
	'Julia',
	'Lua',
	'Objective-C',
	'OCaml',
	'Perl',
	'R',
	'Racket',
	'REPL',
	'Scheme',
	'Smalltalk',
	'Tcl',
	'VimL',
	'Visual Basic',
	'Volt',
	'XSLT',
	'XQuery',
	'XPath',
	'XProc',
	'XS',
	'Xojo',
	'Xtend'
];

const programmingLanguageIndex = await Widget.start('selectList', {
	label: 'Select your programming language',
	items: languages
});

const wut = await Widget.start('boolean', {
	label: 'What will it be >:D',
	text: {
		true: '=UwU=',
		false: '=OwO='
	}
})

const likesVSC = await Widget.start('boolean', {
	label: 'Do you like VSCode?'
});

if (!likesVSC) {
	const ides = [
		'Visual Studio Code',
		'Visual Studio',
		'IntelliJ',
		'Eclipse',
		'XCode',
		'Android Studio',
		'PyCharm',
		'WebStorm',
		'PhpStorm',
		'CLion',
		'RubyMine'
	];

	const IDEPref = await Widget.start('selectList', {
		label: 'What IDE do you use?',
		items: ides
	});

	console.log(`You use ${IDEPref}`);
	console.log(`You like ${languages[programmingLanguageIndex]}`);
} else {
	console.log(`You like ${languages[programmingLanguageIndex]}`);
	console.log('You like VSCode');
}
