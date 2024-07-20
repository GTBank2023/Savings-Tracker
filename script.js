document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.getElementById('calculate-button');
    const futureBalanceElement = document.getElementById('future-balance');
    const monthlyIncomeInput = document.getElementById('monthly-income');
    const monthlyExpensesInput = document.getElementById('monthly-expenses');
    const savingsGoalInput = document.getElementById('savings-goal');
    const timeframeInput = document.getElementById('timeframe');
    const percentageSaveInput = document.getElementById('percentage-save');
    const interestRateInput = document.getElementById('interest-rate');
    const savingsChartCtx = document.getElementById('savings-chart').getContext('2d');
    const explanationElement = document.getElementById('explanation');
    const suggestionsElement = document.getElementById('suggestions');
    const bankProductsElement = document.getElementById('bank-products');
    const chartDescriptionElement = document.getElementById('chart-description');

    const exampleData = {
        income: 1000000,
        expenses: 500000,
        goal: 2000000,
        timeframe: 12,
        percentageSave: 20
    };

    function calculateFutureBalance(income, expenses, goal, timeframe, percentageSave) {
        const remainingIncome = income - expenses;
        const monthlySavings = remainingIncome * (percentageSave / 100);
        return monthlySavings * timeframe;
    }

    function updateChart(chart, data) {
        chart.data.labels = Array.from({ length: data.timeframe }, (_, i) => i + 1);
        chart.data.datasets[0].data = Array.from({ length: data.timeframe }, (_, i) => (data.income - data.expenses) * (data.percentageSave / 100) * (i + 1));
        chart.update();
    }

    function provideExplanationAndSuggestions(monthlySavings) {
        if (monthlySavings < 0) {
            explanationElement.textContent = 'Negative growth detected: Your monthly expenses exceed your savings, leading to cumulative debt over time.';
            suggestionsElement.innerHTML = `
                <h3>Suggestions for Improvement:</h3>
                <ul>
                    <li>Reduce Expenses: Consider areas where you can cut down on your monthly expenses.</li>
                    <li>Increase Income: Look for opportunities to increase your income or the percentage of income saved.</li>
                    <li>Adjust Savings Goal: You might want to adjust your savings goal or extend the timeframe to make it more achievable.</li>
                </ul>
            `;
        } else {
            explanationElement.textContent = '';
            suggestionsElement.innerHTML = '';
        }
    }

    function recommendBankProducts() {
        bankProductsElement.innerHTML = `
            <h3>Bank Products to Help You Achieve Your Goals:</h3>
            <ul>
                <li><strong>Savings Accounts:</strong> Consider our high-interest savings accounts to grow your savings faster. Enjoy 24/7 banking services through our various e-channels, including Internet Banking, USSD Banking (15097#), and our Mobile Application (GTWorld). Benefit from seamless access to Internet banking, GTConnect (telephone banking), and GTBank Electronic Notification Service. Receive an instant personalized MasterCard for online, POS, and ATM transactions worldwide. Plus, enjoy no monthly maintenance charges and competitive interest rates. <a href="https://linktr.ee/gtworldtanzania">Open Account</a> </li>
            </ul>
        `;
    }

    function updateChartDescription(data) {
        chartDescriptionElement.innerHTML = `
            <h3>Chart Description:</h3>
            <p>The chart shows an estimate of how much your savings could grow over time based on your inputs. Changes in your monthly income, expenses, savings goal, timeframe, and interest rate can affect the outcome.</p>
            <p>Results do not predict future performance and do not account for economic or market factors.</p>
        `;
    }

    const savingsChart = new Chart(savingsChartCtx, {
        type: 'bar',
        data: {
            labels: Array.from({ length: exampleData.timeframe }, (_, i) => i + 1),
            datasets: [{
                label: 'Savings Growth',
                backgroundColor: 'rgba(128, 128, 128, 0.2)',
                borderColor: 'rgba(128, 128, 128, 1)',
                borderWidth: 1,
                data: Array.from({ length: exampleData.timeframe }, (_, i) => (exampleData.income - exampleData.expenses) * (exampleData.percentageSave / 100) * (i + 1))
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    calculateButton.addEventListener('click', () => {
        const monthlyIncome = parseFloat(monthlyIncomeInput.value);
        const monthlyExpenses = parseFloat(monthlyExpensesInput.value);
        const savingsGoal = parseFloat(savingsGoalInput.value);
        const timeframe = parseFloat(timeframeInput.value);
        const percentageSave = parseFloat(percentageSaveInput.value);
        const interestRate = parseFloat(interestRateInput.value) || 0; // Default to 0 if not provided

        const futureBalance = calculateFutureBalance(monthlyIncome, monthlyExpenses, savingsGoal, timeframe, percentageSave);
        futureBalanceElement.textContent = `TZS ${futureBalance.toLocaleString()}`;

        updateChart(savingsChart, { income: monthlyIncome, expenses: monthlyExpenses, goal: savingsGoal, timeframe: timeframe, percentageSave: percentageSave });

        provideExplanationAndSuggestions((monthlyIncome - monthlyExpenses) * (percentageSave / 100));
        updateChartDescription({ income: monthlyIncome, expenses: monthlyExpenses, goal: savingsGoal, timeframe: timeframe, interestRate: interestRate });
        recommendBankProducts();
    });

    // Initialize with example data
    futureBalanceElement.textContent = `TZS ${calculateFutureBalance(exampleData.income, exampleData.expenses, exampleData.goal, exampleData.timeframe, exampleData.percentageSave).toLocaleString()}`;
    provideExplanationAndSuggestions((exampleData.income - exampleData.expenses) * (exampleData.percentageSave / 100));
    updateChartDescription({ income: exampleData.income, expenses: exampleData.expenses, goal: exampleData.goal, timeframe: exampleData.timeframe, interestRate: 0 });
    recommendBankProducts();
});
