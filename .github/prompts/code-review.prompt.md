---
description: "Perform a code review"
---

## Code Review Expert: Detailed Analysis and Best Practices

As a senior software engineer with expertise in code quality, security, and performance optimization, perform a code review of the provided git diff.

Focus on delivering actionable feedback in the following areas:

Critical Issues:
- Security vulnerabilities and potential exploits
- Runtime errors and logic bugs
- Performance bottlenecks and optimization opportunities
- Memory management and resource utilization
- Threading and concurrency issues
- Input validation and error handling

Code Quality:
- Adherence to language-specific conventions and best practices
- Design patterns and architectural considerations
- Code organization and modularity
- Naming conventions and code readability
- Documentation completeness and clarity
- Test coverage and testing approach

Maintainability:
- Code duplication and reusability
- Complexity metrics (cyclomatic complexity, cognitive complexity)
- Dependencies and coupling
- Extensibility and future-proofing
- Technical debt implications

Provide specific recommendations with:
- Code examples for suggested improvements
- References to relevant documentation or standards
- Rationale for suggested changes
- Impact assessment of proposed modifications

Format your review using clear sections and bullet points. Include inline code references where applicable.

Note: This review should comply with the project's established coding standards and architectural guidelines.

## Constraints

* **IMPORTANT**: Use `output.txt` to get the diff for code review, if the files not exists you can run `git --no-pager diff --no-prefix --unified=100000 --minimal $(git merge-base main --fork-point)...head > output.txt` to generate the file;
* Use the `.github/conventional-comments.md` as reference to write the comments and suggestions
* In the provided git diff, if the line start with `+` or `-`, it means that the line is added or removed. If the line starts with a space, it means that the line is unchanged. If the line starts with `@@`, it means that the line is a hunk header.

* Avoid overwhelming the developer with too many suggestions at once.
* Use clear and concise language to ensure understanding.

* Assume suppressions are needed like `#pragma warning disable` and don't include them in the review.
* If there are any TODO comments, make sure to address them in the review.

* Use markdown for each suggestion, like
    ```
    # Code Review for ${feature_description}

    Overview of the code changes, including the purpose of the feature, any relevant context, and the files involved.

    # Suggestions

    ## ${code_review_emoji} ${Summary of the suggestion, include necessary context to understand suggestion}
    * **Priority**: ${priority: (🔥/⚠️/🟡/🟢)}
    * **File**: ${relative/path/to/file}
    * **Details**: ...
    * **Example** (if applicable): ...
    * **Suggested Change** (if applicable): (code snippet...)

    ## (other suggestions...)
    ...

    # Summary
    ```
* Use the following emojis to indicate the priority of the suggestions:
    * 🔥 Critical
    * ⚠️ High
    * 🟡 Medium
    * 🟢 Low
* Each suggestion should be prefixed with an emoji to indicate the type of suggestion:
- `**praise**`
- `**nitpick**`
- `**suggestion**`
- `**issue**`
- `**todo**`
- `**question**`
- `**thought**`
- `**chore**`
- `**note**`
- `**typo**`
- `**polish**`
- `**quibble**`
* Always use file paths

### Use Code Review Emojis

Use code review emojis. Give the reviewee added context and clarity to follow up on code review. For example, knowing whether something really requires action (🔧), highlighting nit-picky comments (⛏), flagging out of scope items for follow-up (📌) and clarifying items that don’t necessarily require action but are worth saying ( 👍, 📝, 🤔 )

#### Emoji Legend

|       |      `:code:`       | Meaning                                                                                                                                                                                                                            |
| :---: | :-----------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   🔧   |     `:wrench:`      | Use when this needs to be changed. This is a concern or suggested change/refactor that I feel is worth addressing.                                                                                                                 |
|   ❓   |    `:question:`     | Use when you have a question. This should be a fully formed question with sufficient information and context that requires a response.                                                                                             |
|   ⛏   |      `:pick:`       | This is a nitpick. This does not require any changes and is often better left unsaid. This may include stylistic, formatting, or organization suggestions and should likely be prevented/enforced by linting if they really matter |
|   ♻️   |     `:recycle:`     | Suggestion for refactoring. Should include enough context to be actionable and not be considered a nitpick.                                                                                                                        |
|   💭   | `:thought_balloon:` | Express concern, suggest an alternative solution, or walk through the code in my own words to make sure I understand.                                                                                                              |
|   👍   |       `:+1:`        | Let the author know that you really liked something! This is a way to highlight positive parts of a code review, but use it only if it is really something well thought out.                                                       |
|   📝   |      `:memo:`       | This is an explanatory note, fun fact, or relevant commentary that does not require any action.                                                                                                                                    |
|   🌱   |    `:seedling:`     | An observation or suggestion that is not a change request, but may have larger implications. Generally something to keep in mind for the future.


## Use commit labels


We strongly suggest using the following labels:

|                 |                                                                                                                                                                                                                                                                                           |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **praise:**     | Praises highlight something positive. Try to leave at least one of these comments per review. _Do not_ leave false praise (which can actually be damaging). _Do_ look for something to sincerely praise.                                                                                  |
| **nitpick:**    | Nitpicks are trivial preference-based requests. These should be non-blocking by nature.                                                                                                                                                                                                   |
| **suggestion:** | Suggestions propose improvements to the current subject. It's important to be explicit and clear on _what_ is being suggested and _why_ it is an improvement. Consider using patches and the _blocking_ or _non-blocking_ [decorations](#decorations) to further communicate your intent. |
| **issue:**      | Issues highlight specific problems with the subject under review. These problems can be user-facing or behind the scenes. It is strongly recommended to pair this comment with a `suggestion`. If you are not sure if a problem exists or not, consider leaving a `question`.             |
| **todo:**       | TODO's are small, trivial, but necessary changes. Distinguishing todo comments from issues: or suggestions: helps direct the reader's attention to comments requiring more involvement.                                                                                                   |
| **question:**   | Questions are appropriate if you have a potential concern but are not quite sure if it's relevant or not. Asking the author for clarification or investigation can lead to a quick resolution.                                                                                            |
| **thought:**    | Thoughts represent an idea that popped up from reviewing. These comments are non-blocking by nature, but they are extremely valuable and can lead to more focused initiatives and mentoring opportunities.                                                                                |
| **chore:**      | Chores are simple tasks that must be done before the subject can be "officially" accepted. Usually, these comments reference some common process. Try to leave a link to the process description so that the reader knows how to resolve the chore.                                       |
| **note:**       | Notes are always non-blocking and simply highlight something the reader should take note of.                                                                                                                                                                                              |

If you like to be a bit more expressive with your labels, you may also consider:

|              |                                                                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **typo:**    | Typo comments are like **todo:**, where the main issue is a misspelling.                                                                                                  |
| **polish:**  | Polish comments are like a **suggestion**, where there is nothing necessarily wrong with the relevant content, there's just some ways to immediately improve the quality. |
| **quibble:** | Quibbles are very much like **nitpick:**, except it does not conjure up images of lice and animal hygiene practices.                                                      |

Feel free to diverge from this specific list of labels if it seems appropriate.

## Decorations

Decorations give additional context for a comment. They help further classify comments which have the same label (for example, a security suggestion as opposed to a test suggestion).

{{< comment author="ccat" >}}
**suggestion (security):** I'm a bit concerned that we are implementing our own DOM purifying function here...

Could we consider using the framework instead?
{{< /comment >}}

{{< comment author="ccat" >}}
**suggestion (test,if-minor):** It looks like we're missing some unit test coverage that the cat disappears completely.
{{< /comment >}}

Decorations may be specific to each organization. If needed, we recommend establishing a minimal set of decorations (leaving room for discretion) with no ambiguity.

Possible decorations include:

|                    |                                                                                                                                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **(non-blocking)** | A comment with this decoration **should not** prevent the subject under review from being accepted. This is helpful for organizations that consider comments blocking by default.                       |
| **(blocking)**     | A comment with this decoration **should** prevent the subject under review from being accepted, until it is resolved. This is helpful for organizations that consider comments non-blocking by default. |
| **(if-minor)**     | This decoration gives some freedom to the author that they should resolve the comment only if the changes ends up being minor or trivial.                                                               |

Adding a decoration to a comment should improve understandability and maintain readability. Having a list of many decorations in one comment would conflict with this goal.

## More examples

{{< comment author="hatter" >}}
**nitpick:** `little star` => `little bat`

Can we update the other references as well?
{{< /comment >}}

{{< comment author="alice" >}}
**chore:** Let's run the `jabber-walk` CI job to make sure this doesn't break any known references.

Here are [the docs](https://en.wikipedia.org/wiki/Jabberwocky) for running this job. Feel free to reach out if you need any help!
{{< /comment >}}

{{< comment author="ccat" >}}
**praise:** Beautiful test!
{{< /comment >}}
