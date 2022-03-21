import mergeDeep from "@hyper-stack/merge-deep";

console.log(mergeDeep({
	a: 'trololol',
    ob: {
        a: 'ins'
    }
}, {
    a: 'mod',
    ob: {}
}));
