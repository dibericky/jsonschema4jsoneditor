it('fix ref', () => {
  const schema = {
    "components": {
        "foo": {
            "$ref": "#/components/bar"
        },
        "bar": {
            "type": "string"
        },
        "lorem": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
    },
    "type": "array",
    "items": {
        "$ref": "#/components/foo"
    }
}
  expect(refReplacer(schema)).toEqual({
    "definitions": {
      "components": {
          "definitions": {
            "foo": {
                "$ref": "#/definitions/components/definitions/bar"
            },
            "bar": {
                "type": "string"
            },
            "lorem": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          }
      },
    },
    "type": "array",
    "items": {
        "$ref": "#/definitions/components/definitions/foo"
    }
})

})

it('fix ref - complex', () => {
  const schema = {
      "components": {
          "schemas": {
              "node": {
                  "type": "object",
                  "properties": {
                  "string": {
                      "type": "string"
                  },
                  "children": {
                      "type": "array",
                      "items": {
                      "$ref": "#/components/schemas/node"
                      }
                  }
                  }
              }
            }
      },
      "$ref": "#/components/schemas/node"
  }
  expect(refReplacer(schema)).toEqual({
    "definitions": {
          "components": {
            "definitions": {
                "schemas": {
                        "definitions": {
                            "node": {
                                "type": "object",
                                "properties": {
                                "string": {
                                    "type": "string"
                                },
                                "children": {
                                    "type": "array",
                                    "items": {
                                    "$ref": "#/definitions/components/definitions/schemas/definitions/node"
                                    }
                                }
                                }
                            }
                        }
                    }
            }
          }
      },
      "$ref": "#/definitions/components/definitions/schemas/definitions/node"
  })

})
