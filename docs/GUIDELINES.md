# Guidelines

## Creating new Components

Before creating new components, check that they follow these guidelines.

Components in the `/components` folder should work as a design system for highly reusable/extendable components, following [Atomic Design]. They should be isolated from the rest of the logic ("dumb components"), for example, not using Redux and other businesses logic directly, but using hooks for their internal state only.

Any other component should be organized in the `/views` folder of its belonging concept. These components are not highly reusable, being used only inside its own concept, so they are allowed to have business logic and reuse the design system.

[atomic design]: https://bradfrost.com/blog/post/atomic-web-design
