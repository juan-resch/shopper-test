import slugify from 'slugify'

export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(value: string) {
    return new Slug(value)
  }

  /**
   * Receives a string and normalize it as a slug.
   * Example: "An example" => "an-example"
   * @param text {string}
   */
  static createFromText(text: string): Slug {
    const slugText = slugify(text, {
      lower: true,
    })

    return new Slug(slugText)
  }
}
