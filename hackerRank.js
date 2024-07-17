const puppeteer = require('puppeteer');

const codeObj = require("./codes");

const loginLink = 'https://www.hackerrank.com/auth/login'

// dummy id
const email = "hackerrankautomation@yopmail.com";
const password = "randompasswordforautomation";

// launching the browser in full size 
let browserOpen = puppeteer.launch({
    headless: false,
    args: ['--start-maximized'],
    defaultViewport: null
})

let page;

// opening new page
browserOpen.then(function(browserObj) {
    let browserOpenPromise = browserObj.newPage(); 
    return browserOpenPromise;
}).then(function(newTab) { 
    //going to the hackerrank login page
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function() {
    // entering my email
    let emailIsEntered = page.type("input[type = 'text']" , email, {delay: 50});
    return emailIsEntered;
}).then(function() {
    // entering the password
    let passwordIsEntered = page.type("input[type = 'password']", password, {delay: 50});
    return passwordIsEntered;
}).then(function() {
    // clicking on login button
    let loginButtonClicked = page.click('button[data-hr-focus-item="private"]', {delay: 50});
    return loginButtonClicked;
}).then(function() {
    // clicking on algorithm section
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1 = "algorithms"]', page);
    return clickOnAlgoPromise;
}).then(function() {
    // clicking on the warmup checkbox
    let goToWarmup = waitAndClick('input[value = "warmup"]', page);
    return goToWarmup;
}).then(function() {
    // wait page to load
    let waitFor3Seconds = page.waitForTimeout(3000);
    return waitFor3Seconds;
}).then(function() {
    // lets store all the questions block inside an array
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled');
    return allChallengesPromise;
}).then(function(questionsArr) {
    //console.log("Number Of Question", questionsArr.length)
    let questionsWillBeSolved = questionSolver(page, questionsArr[0], codeObj.answers[0]);
    return questionsWillBeSolved;
})


function waitAndClick(selector, currentPage) {
    return new Promise(function (resolve, reject) {
        let waitForModelPromise = currentPage.waitForSelector(selector);
        waitForModelPromise.then(function() {
            let clickModal = currentPage.click(selector);
            return clickModal;
        }).then(function() {
            resolve();
        }).catch(function(err) {
            reject();
        })
    })
}

function questionSolver(page, question, answer) {
    return new Promise(function(resolve, reject) {
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function() {
            let EditorInFocusPromise = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return EditorInFocusPromise;
        }).then(function() {
            return waitAndClick(".checkbox-input", page);
        }).then(function() {
            return page.waitForSelector("textarea.custominput", page);
        }).then(function() {
            return page.type("textarea.custominput", answer, {delay: 10});
        }).then(function() {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function() {    
            let AisPressed = page.keyboard.press('A', {delay: 100});
            return AisPressed;
        }).then(function() {
            let XisPressed = page.keyboard.press('X', {delay: 100});
            return XisPressed;
        }).then(function() {
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function() {
            let mainEditorInFocus = waitAndClick(".monaco-editor.no-user-select.vs", page);
            return mainEditorInFocus;
        }).then(function() {
            let ctrlIsPressed = page.keyboard.down('Control');
            return ctrlIsPressed;
        }).then(function() {
            let AisPressed = page.keyboard.press('A', {delay: 100});
            return AisPressed;
        }).then(function() {
            let AisPressed = page.keyboard.press('V');
            return AisPressed;
        }).then(function() {
            let ctrlIsUnpressed = page.keyboard.up('Control');
            return ctrlIsUnpressed;
        }).then(function() {
            // return page.click('.hr-monaco__run-code', {delay: 50}); //Run code
            return page.click('.hr-monaco-submit', {delay: 50});       //Submit code
        })
        .then(function() {
            resolve();
        }).catch(function(err) {
            reject();
        })
    })
}







