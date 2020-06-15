<p align="left">
   <img src="docs/logo.svg" width="200"/>
</p>

# Go Barber

> Schedule and manage appointments in barber shops

[![Author](https://img.shields.io/badge/author-LauraBeatris-ff9000?style=flat-square)](https://github.com/LauraBeatris)
[![Languages](https://img.shields.io/github/languages/count/LauraBeatris/gobarber-web?color=%23ff9000&style=flat-square)](#)
[![Stars](https://img.shields.io/github/stars/LauraBeatris/gobarber-web?color=ff9000&style=flat-square)](https://github.com/LauraBeatris/gobarber-web/stargazers)
[![Forks](https://img.shields.io/github/forks/LauraBeatris/gobarber-web?color=%23ff9000&style=flat-square)](https://github.com/LauraBeatris/gobarber-web/network/members)
[![Contributors](https://img.shields.io/github/contributors/LauraBeatris/gobarber-web?color=ff9000&style=flat-square)](https://github.com/LauraBeatris/gobarber-web/graphs/contributors)

---

# :pushpin: Table of Contents

* [Features](#rocket-features)
* [UI Documentation](#framed_picture-ui-documentation)
* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [FAQ](#postbox-faq)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)

# :rocket: Features

* Create a account as a service provider or as a costumer.
* Schedule and manage appointments

# :framed_picture: UI Documentation
This project has a UI Documentation of reusable components, allowing to test them individually.

[Click there to see the storybook](http://storybook-gobarber.lauradeveloper.com.br/?path=/story/*)

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then in order to clone the project via HTTPS, run this command:**

```git clone https://github.com/LauraBeatris/gobarber-web.git```

SSH URLs provide access to a Git repository via SSH, a secure protocol. If you have a SSH key registered in your Github account, clone the project using this command:

```git clone git@github.com:LauraBeatris/gobarber-web.git```

**Install dependencies**

```yarn install```

Create your enviroment variables based on the examples of ```.env.example```

```cp .env.example .env```

After copying the examples, make sure to fill the variables with new values.

**Setup the API**

The interface needs to interact with the server to get the list of transactions and execute mutations.

Make sure to go to the [Hotseat API](https://github.com/LauraBeatris/hotseat) repository and follow the instructions in order to get it running in your machine.

# :runner: Getting Started

Run the following command in order to start the application in a development environment:

```yarn start```


# :postbox: Faq

**Question:** What are the tecnologies used in this project?

**Answer:** The tecnologies used in this project are [React](https://pt-br.reactjs.org/) + [Styled Components](https://styled-components.com/) to handle scoped CSS.

I'm also using [SWR](https://swr.now.sh/) in order to easily cache and mutate the transactions data.

# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the [Go Barber Web](https://github.com/LauraBeatris/gobarber-web/issues) repository. If you already found a solution to your problem, **i would love to review your pull request**! Have a look at our [contribution guidelines](https://github.com/LauraBeatris/gobarber-web/blob/master/CONTRIBUTING.md) to find out about the coding standards.

# :tada: Contributing

Check out the [contributing](https://github.com/LauraBeatris/gobarber-web/blob/master/CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# :closed_book: License

Released in 2020 (Work in progress)
This project is under the [MIT license](https://github.com/LauraBeatris/gobarber-web/master/LICENSE).

Made with love by [Laura Beatris](https://github.com/LauraBeatris) 💜🚀
