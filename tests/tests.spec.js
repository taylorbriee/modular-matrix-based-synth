const { AppConnection } = require('@focusritegroup/juce-end-to-end');

const {appPath} = require('./app-path');

jest.setTimeout(20000)

let app;

async function loadVCO(sleep, inputSlotID, VCOFreq, VCOFreqMod) {
    await sleep(500);
    await app.setComboBoxSelectedItemIndex("InputBox"+inputSlotID, 1);

    await sleep(500);
    await app.clickComponent('VCOSlot'+inputSlotID);

    await sleep(500);
    await app.setSliderValue('VCOSlot'+inputSlotID+'Freq', VCOFreq);

    await sleep(500);
    await app.setSliderValue('VCOSlot'+inputSlotID+'FreqMod', VCOFreqMod);

    await sleep(500);
    await app.clickComponent('VCOSlot'+inputSlotID+'Back');

    await sleep(500);
    await app.setComboBoxSelectedItemIndex('outputBox'+inputSlotID, 1);
}

async function loadLFO(sleep, inputSlotID, LFOFreq) {
    await sleep(500);
    await app.setComboBoxSelectedItemIndex("InputBox"+inputSlotID, 2);

    await sleep(500);
    await app.clickComponent('LFOSlot'+inputSlotID);

    await sleep(500);
    await app.setSliderValue('LFOSlot'+inputSlotID+'Freq', LFOFreq);

    await sleep(500);
    await app.clickComponent('LFOSlot'+inputSlotID+'Back');
}

describe('My app tests', () => {

    beforeEach(async () => {
        app = new AppConnection({appPath: appPath});
        await app.launch();
    });

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }


    it('Getting an audible VCO',async() => {
        await loadVCO(sleep, 1, 300, 0);
        await app.setSliderValue("1x1Dial", 10.0);
    });

    it('Modulate VCO Frequency',async() => {

        await loadVCO(sleep, 1, 300, 2.0);
        await app.setSliderValue("1x1Dial", 10.0);

        await loadLFO(sleep, 2, 100);
        await app.setSliderValue("2x2Dial", 10.0);
        await app.setComboBoxSelectedItemIndex('outputBox2', 2);
    });

    it('Multiple LFOs',async() => {

        await loadVCO(sleep, 1, 300, 2.0);
        await app.setSliderValue("1x1Dial", 10.0);

        await loadLFO(sleep, 2, 100);
        await app.setSliderValue("2x2Dial", 10.0);
        await app.setComboBoxSelectedItemIndex('outputBox2', 2);

        await loadLFO(sleep, 3, 150);
        await app.setSliderValue("2x3Dial", 5.0);

    });


    it('Multiple Modulated VCOs',async() => {

        await loadVCO(sleep, 1, 300, 2.0);
        await app.setSliderValue("1x1Dial", 10.0);

        await loadVCO(sleep, 2, 500, 2.0);
        await app.setSliderValue("2x2Dial", 10.0);

        await loadLFO(sleep, 3, 100);
        await app.setSliderValue("3x3Dial", 10.0);
        await app.setComboBoxSelectedItemIndex('outputBox3', 2);

        await loadLFO(sleep, 4, 200);
        await app.setSliderValue("4x4Dial", 10.0);
        await app.setComboBoxSelectedItemIndex('outputBox4', 6);

    });


    //Tests Todo:

    //why running all the tests in parallel, some freeze (think this might be because some tests timeout after 5000ms)


    // figure out the exact steps to log out and in to different github accounts (can I use github desktop or is that seperate from github terminal).

    //figure out how paralism works (when muliple software instances are loaded up)












    // it('Loading up VCO and modulating its frequency with an LFO example',async() => {
    //     await loadAudibleVCO(sleep);
    //
    //
    // });
    //
    // it('',async() => {
    //
    // });
    //
    // it('',async() => {
    //
    // });
    //
    // it('',async() => {
    //
    // });
    //
    // it('',async() => {
    //
    // });


    // it('adds two numbers', () => {
    //     expect(1+1).toEqual(2);
    // });
});

