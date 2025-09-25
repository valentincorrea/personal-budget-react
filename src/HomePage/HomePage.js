import React from "react";

function HomePage() {
  return (
    <main className="center" id="main">
      <section className="page-area">
        <h2>Improve your finances by following these simple recommendations</h2>
        <br />
        <hr />
        <article>
          <h2>Stay on track</h2>

          <p>
            Do you know where you are spending your money? If you really stop to
            track it down, you would get surprised! Proper budget management
            depends on real data... and this app will help you with that!
          </p>
        </article>

        <article>
          <h2>Alerts</h2>
          <p>
            What if your clothing budget ended? You will get an alert. The goal
            is to never go over the budget.
          </p>
        </article>

        <article>
          <h2>Results</h2>
          <p>
            People who stick to a financial plan, budgeting every expense, get
            out of debt faster! Also, they to live happier lives... since they
            expend without guilt or fear... because they know it is all good and
            accounted for.
          </p>
        </article>

        <article>
          <h2>Free</h2>
          <p>This app is free!!! And you are the only one holding your data!</p>
        </article>

        <article>
          <h2 className="center">Chart</h2>

          <figure>
            <canvas id="myChart" width="450" height="450"></canvas>

            <figcaption className="center">Personal budget chart</figcaption>
          </figure>
        </article>
      </section>
      <div id="chart-container"></div>
      <script src="https://d3js.org/d3.v3.min.js"></script>
    </main>
  );
}

export default HomePage;
