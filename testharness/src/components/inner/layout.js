export const layout = {
  component: 'Content',
  children: [
    { component: "ssrIndicator"},
    { component: "BadConstructor"},
    { component: "Foo"},
    { component: "PText", props: {text: "this is text in a p"}},
    { component: "TopLevel",
      children: [
        {
          component: "MidLevel",
          children: [
            { component: "LowestLevel"},
            { component: "dumbComponent"},
            { component: "connectedComponent"},
          ],
        },
      ]},
    { component: "Clock"},
    { component: "TopLevel",
      children: [
        { component: "BadConstructor"},
        {
          component: "MidLevel",
          children: [
            { component: "LowestLevel"},
            { component: "BadConstructor"},
            { component: "connectedComponent"},
          ],
        },
      ]},
  ] }

export const simple = {
  component: 'Content',
}

export default layout
