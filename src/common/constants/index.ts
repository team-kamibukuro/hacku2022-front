export const LANGUAGES = [
  "c",
  "csharp",
  "cpp",
  "go",
  "java",
  "javascript",
  "php",
  "perl",
  "python",
  "r",
  "ruby",
  "rust",
  "scala",
  "swift",
  "typescript",
];

export const TEMPLATE = [
  {
    language: "c",
    template: `
// This file is a "Hello, world!" in C language by gcc for INJECTION.
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    puts("Hello, INJECTION!");
    return EXIT_SUCCESS;
}

// GCC reference:
//   https://gcc.gnu.org/

// C language references:
//   https://msdn.microsoft.com/library/fw5abdx6.aspx
//   https://www.gnu.org/software/gnu-c-manual/
`,
  },
  {
    language: "csharp",
    template: `
// This file is a "Hello, world!" in C# language by Mono for wandbox.
using System;

namespace Injection
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello, INJECTION!");
        }
    }
}

// Mono references:
//   http://www.mono-project.com/

// C# language references:
//   https://msdn.microsoft.com/library/618ayhy6.aspx
`,
  },
  {
    language: "cpp",
    template: `
// This file is a "Hello, world!" in C++ language by GCC for INJECTION.
#include <iostream>
#include <cstdlib>

int main()
{
    std::cout << "Hello, INJECTION!" << std::endl;
}

// GCC reference:
//   https://gcc.gnu.org/

// C++ language references:
//   https://cppreference.com/
//   https://isocpp.org/
//   http://www.open-std.org/jtc1/sc22/wg21/

// Boost libraries references:
//   https://www.boost.org/doc/
`,
  },
  {
    language: "go",
    template: `
// This file is a "Hello, world!" in Go language for INJECTION.
package main

import (
        "fmt"
)

func main() {
        fmt.Println("Hello, INJECTION!")
}

// Go language references:
//   https://golang.org/pkg/
`,
  },
  {
    language: "java",
    template: `
// This file is a "Hello, world!" in Java language by OpenJDK for INJECTION.
import java.util.*;

class Injection
{
    public static void main(String[] args)
    {
        System.out.println("Hello, Injection!");
    }
}

// OpenJDK reference:
//   http://openjdk.java.net/

// Java language references:
//   http://docs.oracle.com/javase
`,
  },
  {
    language: "javascript",
    template: `
// This file is a "Hello, world!" in JavaScript by Node.js for INJECTION.

var lines = []; 

var reader = require("readline").createInterface({
  input: process.stdin,
});

reader.on("line", (line) => {
  console.log("Hello, INJECTION!");
});

// Node.js reference:
//   https://nodejs.org/

// JavaScript language references:
//   http://www.ecma-international.org/publications/standards/Ecma-262.htm
//   https://developer.mozilla.org/docs/Web/JavaScript
//   https://msdn.microsoft.com/library/d1et7k7c(v=vs.94).aspx
`,
  },
  {
    language: "php",
    template: `
<?php
// This file is a "Hello, world!" in PHP for INJECTION.
print("Hello, INJECTION!\n");
// PHP references:
//   http://php.net
`,
  },
  {
    language: "perl",
    template: `
# This file is a "Hello, world!" in Perl language for INJECTION.

print "Hello, INJECTION!\n";

# Perl language references:
#   http://perldoc.perl.org/
`,
  },
  {
    language: "python",
    template: `
# This file is a "Hello, world!" in Python language by CPython for INJECTION.

print("Hello, INJECTION!")

# CPython references:
#   https://www.python.org/
`,
  },
  {
    language: "r",
    template: `
# This file is a "Hello, world!" in R language for INJECTION.

data(iris)                               ## the "hello, world" of statistics.
summary(iris)                            ## a simple summary of the columns
fit <- lm(Sepal.Length ~ . , data=iris)  ## basic regression
summary(fit)                             ## summary

cat("All done\n")

# R language references:
#   https://cran.r-project.org/manuals.html
`,
  },
  {
    language: "ruby",
    template: `
# This file is a "Hello, world!" in Ruby language by ruby for INJECTION.

puts "Hello, INJECTION!"

# Ruby reference:
#   https://docs.ruby-lang.org/
`,
  },
  {
    language: "rust",
    template: `
// This file is a "Hello, world!" in Rust language for INJECTION.

fn main()
{
    println!("Hello, INJECTION!");
}

// Rust language references:
//   https://www.rust-lang.org/
`,
  },
  {
    language: "scala",
    template: `
// This file is a "Hello, world!" in Scala language for INJECTION.

object Injection {
  def main(args: Array[String]): Unit = {
    println("Hello, INJECTION!")
  }
}

// Scala language references:
//   http://www.scala-lang.org
`,
  },
  {
    language: "swift",
    template: `
// This file is a "Hello, world!" in Apple Swift language for INJECTION.
print("Hello, INJECTION!");

// Apple Swift language references:
//   http://www.apple.com/swift/
`,
  },
  {
    language: "typescript",
    template: `
const n: string = "Hello, INJECTION!";
console.log(n);
`,
  },
];
