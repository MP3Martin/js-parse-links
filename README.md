[![CodeFactor](https://www.codefactor.io/repository/github/MP3Martin/js-parse-links/badge)](#/)
[<img src="https://img.shields.io/github/license/MP3Martin/js-parse-links">](#/)
[<img src="https://img.shields.io/github/stars/MP3Martin/js-parse-links">](#/)
[<img src="https://img.shields.io/github/forks/MP3Martin/js-parse-links">](#/)
[<img src="https://img.shields.io/github/issues/MP3Martin/js-parse-links">](#/)

# js-parse-links
**⚠️ Not finished ⚠️**

Todo:
- [x] Make the website look acceptable
- [x] System to get parameters and generate url
- [x] Loading icon
- [x] Use text in placeholders
- [x] Use APIs in placeholders _- (the main feature)_
- [x] Documentation
- [ ] Downloading files
- [ ] Add more parameters
- [ ] Add auto text wrapping (in display mode)

# Examples
* `https://mp3martin.github.io/js-parse-links/?url=https://google.{tld}/search?q={search}&placeholder=tld,com;search,Hello World!`
   * goes to `https://www.google.com/search?q=Hello%20World!` <br><br>
* `https://mp3martin.github.io/js-parse-links/?url={fact}&placeholder=fact,https://dog.ceo/api/breeds/image/random|message`
   * goes to `https://images.dog.ceo/breeds/` _+ random dog image_ <br><br>
* `https://mp3martin.github.io/js-parse-links/?url=https://google.com/search?q=Tr*mp once said: "{fact}"&placeholder=fact,https://tronalddump.io/random/quote|value`
   * goes to `https://www.google.com/search?q=Tr*mp%20once%20said:` _+ random fact_
* `https://parse.mp3martin.xyz/?url=Fun Fact: {fact}<br><br><br>-'amp'nbsp'semi' 'amp'nbsp'semi'Refresh to see more!&placeholder=fact,https://uselessfacts.jsph.pl/random.json?language=en|text&type=display`
   * displays random fact

# Parameters
| Parameter         | Default value             | Type    | Required            | Description                                                                                                                                                                                                                     | Example value                                                    |
| ----------------- | ------------------------- | ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `url`             | :x:                       | string  | :heavy_check_mark:  | The target url                                                                                                                                                                                                                  | `https://www.google.com/search?q={search}`                       |
| `placeholder`     | :x:                       | string  | :x:                 | All the placeholders (in this format: `key,value;another_key,another_value`)                                                                                                                                                    | `search,Hello World!`                                            |
| `type`            | redirect                  | string  | :x:                 | Type of redirection / thing to do after parsing the url (all possible values: `redirect`, `display`)                                                                                                                                                                        | `redirect`                                                       |

<br>

# Other info
* By the way, this project is serverless (it is only a static site, everything happens client-side)
* Use this project for anything.
* Do not share `parse.mp3martin.xyz`, instead use `mp3martin.github.io/js-parse-links` because it may change.
<br>

If you find this useful, you can show support by **⭐**ing this project or contributing to this project. (**not mandatory!**)
