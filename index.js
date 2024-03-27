#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000;
let myPincode = 5555;
// Enter pincode
let answers = await inquirer.prompt([
    {
        type: "number",
        name: "pincode",
        message: "Enter the pincode"
    }
]);
if (answers.pincode === myPincode) {
    console.log("Access Granted");
    // Proceed further
    let answer = await inquirer.prompt([
        {
            type: "list",
            name: "operation",
            message: "Select One in Given Options",
            choices: ["Withdraw Money", "Check Balance", "Fast Cash"]
        }
    ]);
    if (answer.operation === "Withdraw Money") {
        let amountAns = await inquirer.prompt([
            {
                type: "number",
                name: "amount",
                message: "Enter the amount to withdraw"
            }
        ]);
        myBalance -= amountAns.amount;
        if (amountAns.amount > myBalance) {
            console.log(chalk.red("Insufficient Balance"));
        }
        else {
            console.log(`Amount Withdrawn! Your remaining Balance is: ${myBalance}`);
        }
    }
    else if (answer.operation === "Check Balance") {
        console.log(`Your Current Balance is: ${myBalance}`);
    }
    else if (answer.operation === "Fast Cash") {
        // Handle Fast Cash directly
        let cash = await inquirer.prompt([
            {
                type: "list",
                name: "fastcash",
                message: "Select Fast Cash Amount",
                choices: [1000, 2000, 5000, 10000] // Assuming these are the fast cash amounts
            }
        ]);
        if (cash.fastcash > myBalance) {
            console.log(chalk.red("Insufficient Balance for Fast Cash"));
        }
        else {
            myBalance -= cash.fastcash;
            console.log(`Fast Cash Withdrawn! Your remaining Balance is: ${myBalance}`);
        }
    }
}
else {
    console.log("Access Denied");
}
