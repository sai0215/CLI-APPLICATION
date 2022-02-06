#!/usr/bin/env node 

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

console.log(chalk.red('Say Cheese'));

let player;

const sl=(ms=2000)=>new Promise((r) => setTimeout(r,ms)); //a helper function to help the user see the animation as it takes time load
async function wel(){ //A welcome function
    const rainbTitle=chalkAnimation.rainbow(
        'Lets Play the game? \n'
    );
    await sl(); //This will allow the rainbow to animate for 2 secs
    rainbTitle.stop(); 
// The below code uses backtakes while consolelogging which will create a Template Literal
//Template Literal Makes the us to insert values directly into the text and allows multi-line logs without line break chars
    console.log(` 
    ${chalk.green.bgBlack('INSTRUCTIONS')}
    Welcome to the world of computers.
    This is a small quiz which will umlock a codden egg.
    To unlock it you must answer all the questions.
    Even the slightest wrong answer will get you ${chalk.red('ELIMINATED')}
    All The Best....
    `);
}

await wel() //node.js supports top level await

//This function takes input fom the user using Inquirer package
async function aName(){
    const ans=await inquirer.prompt({
        name:'player_name',
        type:'input',
        message:'Type your name!',
        default() {
            return 'Player';

        },
    });
    player=ans.player_name;
}
await aName();
//The below function provides the user will multiple choice questions
async function q1(){
    const ans=await inquirer.prompt({
        name:'q1',
        type:'list',
        message: 'Who are you?\n',
        choices: [
            'Human',
            'Animal',
            'Bird',
            'Alien',
        ],
    });
    return handleAns(ans.q1=='Human');
}
// The below function is to handle the answer and give back the user an optimal reponse depending on the option he/she chose
async function handleAns(isCorrect){
    const spinner = createSpinner('Checking answer...').start(); //A nanospinner that will run for 2 secs while checking the answer
    await sl(); //The sleep function we wrote above!

    //Now we will write the condditional code
    if(isCorrect){
        spinner.success({text:`${player} has been verified as a human.`});
    }
    else{
        spinner.error({text:`${player} are eiher a dumb being or an unsually high intelligent being`});
        process.exit(1);// When a process exits it either has a code of wither 0 or 1. 1 Mean it has an error which further will terminate the script

    }
    
}

await q1();