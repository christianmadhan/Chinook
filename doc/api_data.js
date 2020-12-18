define({ "api": [
  {
    "type": "post",
    "url": "/get-all-albums",
    "title": "gets all albums",
    "name": "GetAllAlbums",
    "group": "Album",
    "version": "0.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "AlbumId",
            "description": "<p>The Id of the Album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Title",
            "description": "<p>The title of the Album</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Name",
            "description": "<p>The name of the Album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success:",
          "content": "[{\n  AlbumId: \"5\",\n  Title: \"Big Ones\",\n  Name: \"Aerosmith\"\n},\n{\n \"AlbumId\": \"6\",\n     \"Title\": \"Jagged Little Pill\",\n     \"Name\": \"Alanis Morissette\"\n}]",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "auth",
            "optional": false,
            "field": "a",
            "description": "<p>valid auth token is required.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthEmptyError",
            "description": "<p>the auth token was empty/or not included. Minimum of <code>auth: &quot;example&quot;</code> is required in post body.</p>"
          }
        ]
      }
    },
    "filename": "./controller/album/get-all-albums.php",
    "groupTitle": "Album"
  },
  {
    "type": "post",
    "url": "/controller/album/get-album",
    "title": "get one album",
    "name": "GetOneAlbum",
    "group": "Album",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "albums",
            "description": "<p>A list of albums</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success:",
          "content": "[{\n  AlbumId: \"5\",\n  Title: \"Big Ones\",\n  Name: \"Aerosmith\"\n}]",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "auth",
            "optional": false,
            "field": "a",
            "description": "<p>valid auth token is required.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthEmptyError",
            "description": "<p>the auth token was empty/or not included. Minimum of <code>auth: &quot;example&quot;</code> is required in post body.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidAlbumId",
            "description": "<p>the album with <code>&quot;AlbumId&quot;: &quot;id&quot; </code> was not found. make sure the album id exist.</p>"
          }
        ]
      }
    },
    "filename": "./controller/album/get-album.php",
    "groupTitle": "Album"
  },
  {
    "type": "post",
    "url": "/controller/artist/get-all-artist",
    "title": "get all artists",
    "name": "GetAllArtist",
    "group": "Artist",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "artust",
            "description": "<p>A list of artist</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success:",
          "content": "[   \n {\n     ArtistId: \"3\",\n     Name: \"Aerosmith\"\n },\n]",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "auth",
            "optional": false,
            "field": "auth",
            "description": "<p>a valid auth token is required.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthEmptyError",
            "description": "<p>the auth token was empty/or not included. Minimum of <code>auth: &quot;example&quot;</code> is required in post body.</p>"
          }
        ]
      }
    },
    "filename": "./controller/artist/get-all-artist.php",
    "groupTitle": "Artist"
  },
  {
    "type": "post",
    "url": "/controller/auth/change-password.php",
    "title": "change password",
    "name": "ChangePassword",
    "group": "Auth",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "auth",
            "description": "<p>a valid auth token is required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"auth\": \"example\",\n \"Password\": \"example\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success:",
          "content": "[   \n {\n     response: \"Success\"\n },\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthEmptyError",
            "description": "<p>the auth token was empty/or not included. Minimum of <code>auth: &quot;example&quot;</code> is required in post body.</p>"
          }
        ]
      }
    },
    "filename": "./controller/auth/change-password.php",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/controller/auth/newuser.php",
    "title": "creates new user.",
    "name": "Create_new_user",
    "group": "Auth",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"Email\": \"example@email.dk\",\n \"Password\": \"example\",\n \"RepeatPassword\": \"example\"\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "{\n   \"auth token\"\n},",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidDataSupplied",
            "description": "<p>the fields Email/Password/RepeatPassword was not included in post body.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Email and password were incorrect / or doesnt not exits in system.</p>"
          }
        ]
      }
    },
    "filename": "./controller/auth/newuser.php",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/controller/auth/login.php",
    "title": "login user.",
    "name": "Login",
    "group": "Auth",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "auth",
            "description": "<p>a valid auth token is required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"Email\": \"example@email.dk\",\n \"Password\": \"example\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "{\n   \"auth token\"\n},",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidDataSupplied",
            "description": "<p>the fields Email/Password was not included in post body.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Email and password were incorrect / or doesnt not exits in system.</p>"
          }
        ]
      }
    },
    "filename": "./controller/auth/login.php",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/controller/cart/add-track.php",
    "title": "add track",
    "name": "AddTrackToCart",
    "group": "Cart",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "auth",
            "description": "<p>a valid auth token is required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": " {\nauth: \"example\"\ntrackId: 10,\nquantity: 2,\ninvoiceId: 416,\nunitPrice: 0.99\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "{\n    response: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthEmptyError",
            "description": "<p>the auth token was empty/or not included. Minimum of <code>auth: &quot;example&quot;</code> is required in post body.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TracIdEmptyOrInvalidError",
            "description": "<p>the trackId was either not supplied or doesn't exit in the database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "QuantityEmptyOrNotAllowedError",
            "description": "<p>the quantiy was either not supplied or is greate than 10 which is the maximun quantity allowed.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvoiceIdEmptyOrInvalidError",
            "description": "<p>the invoiceId was either not supplied or doesn't exit in the database.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UnitPriceEmptyOrNotANumberError",
            "description": "<p>the unitPrice was either not supplied or is not an integer.</p>"
          }
        ]
      }
    },
    "filename": "./controller/cart/add-track.php",
    "groupTitle": "Cart"
  },
  {
    "type": "post",
    "url": "/controller/cart/get-cart.php",
    "title": "get cart",
    "name": "GetCart",
    "group": "Cart",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "auth",
            "description": "<p>a valid auth token is required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n auth: \"example\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "{\n    {\n\"BillingInfo\": [\n    {\n        \"Address\": \"katrinedal 16\",\n        \"City\": \"Svinninge\",\n        \"State\": \"Sjælland\",\n        \"Country\": \"Danmark\",\n        \"PostalCode\": \"4520\"\n    }\n],\n\"InvoiceLine\": [\n    {\n        \"Quantity\": \"1\",\n        \"UnitPrice\": \"0.99\",\n        \"Name\": \"Walk On Water\"\n    }]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthEmptyError",
            "description": "<p>the auth token was empty/or not included. Minimum of <code>auth: &quot;example&quot;</code> is required in post body.</p>"
          }
        ]
      }
    },
    "filename": "./controller/cart/get-cart.php",
    "groupTitle": "Cart"
  },
  {
    "type": "post",
    "url": "/controller/cart/purchase.php",
    "title": "purchase items from cart",
    "name": "PurchaseCart",
    "group": "Cart",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "auth",
            "description": "<p>a valid auth token is required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "  {\n\"auth\": \"example\",\n\"Total\": 12.0,\n\"Address\": \"Katrinedal 16\",\n\"City\": \"Svinninge\",\n\"State\": \"Sjælland\",\n\"Country\": \"Denmark\",\n\"PostalCode\": \"4520\"\n  }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "{\n \"response\": \"Successfully Purchased\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthEmptyError",
            "description": "<p>the auth token was empty/or not included. Minimum of <code>auth: &quot;example&quot;</code> is required in post body.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BillingInformationNotfulliedError",
            "description": "<p>missing billing information - make sure that everything is included in post body.</p>"
          }
        ]
      }
    },
    "filename": "./controller/cart/purchase.php",
    "groupTitle": "Cart"
  },
  {
    "type": "get",
    "url": "/controller/customer/get-all-customer.php",
    "title": "get all customers",
    "name": "GetAllCustomer",
    "group": "Customer",
    "version": "0.0.0",
    "description": "<p>Only used for testing This endpoint will need to be removed at one point Since it exposes sensitive information.</p>",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "[\n   {\n       \"CustomerId\": \"1\",\n       \"FirstName\": \"Luís\",\n       \"LastName\": \"Gonçalves\",\n       \"Password\": \"$2y$10$WtD6WywiBP7qNi8yZj7gYuIhjTy1xsAwAKSEgXj/ftRZWTLjz1cpu\",\n       \"Company\": \"Embraer - Empresa Brasileira de Aeronáutica S.A.\",\n       \"Address\": \"Av. Brigadeiro Faria Lima, 2170\",\n       \"State\": \"SP\",\n       \"Country\": \"Brazil\",\n       \"PostalCode\": \"12227-000\",\n       \"Phone\": \"+55 (12) 3923-5555\",\n       \"Fax\": \"+55 (12) 3923-5566\",\n       \"Email\": \"luisg@embraer.com.br\"\n   },\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "./controller/customer/get-all-customers.php",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/controller/customer/get-single-customer.php",
    "title": "Get one customer",
    "name": "GetOneCustomer",
    "group": "Customer",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "auth",
            "description": "<p>a valid auth token is required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  auth: \"example\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "[\n   {\n       \"CustomerId\": \"61\",\n       \"FirstName\": \"christian\",\n       \"LastName\": \"witt\",\n       \"Password\": \"$2y$10$avg6prbpmOh7UJmior83f.dQdCDSCjad6vyaw1ao6S/nXPyuDmWAi\",\n       \"Company\": \"voli aps\",\n       \"Address\": \"katrinedal 16\",\n       \"City\": \"Svinninge\",\n       \"State\": \"Sjælland\",\n       \"Country\": \"Danmark\",\n       \"PostalCode\": \"4520\",\n       \"Phone\": \"23957871\",\n       \"Fax\": \"\",\n       \"Email\": \"test@test.dk\"\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthEmptyError",
            "description": "<p>the auth token was empty/or not included. Minimum of <code>auth: &quot;example&quot;</code> is required in post body.</p>"
          }
        ]
      }
    },
    "filename": "./controller/customer/get-single-customer.php",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/controller/customer/update-customer.php",
    "title": "Update customer",
    "name": "UpdateCustomer",
    "group": "Customer",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "auth",
            "description": "<p>a valid auth token is required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"auth\": \"example\",\n   \"Firstname\": \"christian\",\n   \"Lastname\": \"witt\",\n   \"Company\": \"Mærsk\",\n   \"Address\": \"Bakkesvinget\",\n   \"City\": \"Århus\",\n   \"State\": \"jylland\",\n   \"Country\": \"denmark\",\n   \"PostalCode\": \"2323\",\n   \"Phone\": \"1231232323\",\n   \"Fax\": \"12312544\",\n   \"Email\": \"example@email.dk\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "[\n   {\n       \"response\": \"\"Customer updated\"\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "AuthEmptyError",
            "description": "<p>the auth token was empty/or not included. Minimum of <code>auth: &quot;example&quot;</code> is required in post body.</p>"
          }
        ]
      }
    },
    "filename": "./controller/customer/update-customer.php",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "/controller/track/get-all-tracks.php",
    "title": "Get all tracks",
    "name": "GetAllTracks",
    "group": "Track",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "[\n   {\n       \"TrackId\": \"23\",\n       \"Name\": \"Walk On Water\",\n       \"AlbumId\": \"5\",\n       \"MediaTypeId\": \"1\",\n       \"GenreId\": \"1\",\n       \"Composer\": \"Steven Tyler, Joe Perry, Jack Blades, Tommy Shaw\",\n       \"Milliseconds\": \"295680\",\n       \"Bytes\": \"9719579\",\n       \"UnitPrice\": \"0.99\"\n   }\n ]",
          "type": "json"
        }
      ]
    },
    "filename": "./controller/track/get-all-tracks.php",
    "groupTitle": "Track"
  },
  {
    "type": "post",
    "url": "/controller/track/get-track.php",
    "title": "Get one track",
    "name": "GetOneTrack",
    "group": "Track",
    "version": "0.0.0",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Access-Control-Allow-Origin\": \"*\"\n  \"Content-Type\": \"application/json; charset=UTF-8\"\n\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "json",
            "optional": false,
            "field": "auth",
            "description": "<p>a valid auth token is required.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"TrackId\": 123\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "json",
            "optional": false,
            "field": "response",
            "description": "<p>success response</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example data on success: ",
          "content": "[\n   {\n       \"Name\": \"Quadrant\",\n       \"AlbumId\": \"13\",\n       \"MediaTypeId\": \"1\",\n       \"GenreId\": \"2\",\n       \"Composer\": \"Billy Cobham\",\n       \"Milliseconds\": \"261851\",\n       \"Bytes\": \"8538199\",\n       \"UnitPrice\": \"0.99\"\n   }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "TrackDoesNotExitError",
            "description": "<p>the trackid provided does not exit or is missing from post body.</p>"
          }
        ]
      }
    },
    "filename": "./controller/track/get-track.php",
    "groupTitle": "Track"
  }
] });
