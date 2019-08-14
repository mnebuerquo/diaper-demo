export const layout = {
  component: 'Content',
  children: [
    { component: "ssrIndicator"},
    { component: "BadConstructor"},
    { component: "Foo"},
    { component: "PText", props: {text: "this is text in a p"}},
    { component: "Clock"},
    { component: "TopLevel",
      children: [
        { component: "BadConstructor"},
        {
          component: "MidLevel",
          children: [
            { component: "BadConstructor"},
            { component: "LowestLevel"},
            { component: "connectedComponent"},
          ],
        },
      ]},
    { component: "PText", props: {text: "This should be the end."}},
  ] }

export const simple = {
  component: 'Content',
}

export default layout
