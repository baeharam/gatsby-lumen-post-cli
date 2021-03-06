# gatsby-lumen-post-cli

## Why?

[gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen) doesn't have post generator scripts or CLIs. Therefore, it is hard to generate new post and user has to make on his/her own. So, I made it for the better blogging.

## Installation

:warning: You must install in your root folder

* **npm**

```bash
npm install gatsby-lumen-post-cli
```

* **yarn**

```bash
yarn add gatsby-lumen-post-cli
```

## Assumption

This script assumes that post markdown files are located in `/content/posts` like official folder structure. Accordingly, all posts have to be located in that directory, but subdirectory is fine.

## Usage

* **Start script**

```bash
lumen-post
```

* **Features**
  * **Category** : choose existing one or add new category
  
  * **Title** : input title
  
  * **Tags** : choose existing ones and add new tags
  
    * When input multiple tags, **delimiter is space(" ")** . So, you have to input like below.
  
    * ```bash
      tag1 tag2
      ```
  
  * **Description** : input description
  
  * **Date** , **slug** , **template** are automatically inserted and **draft** is set as `false`

When you finishes above works, post markdown file is created in `content/posts/[category]` 

<img src='./gif/demo.gif'>

## LICENSE

MIT