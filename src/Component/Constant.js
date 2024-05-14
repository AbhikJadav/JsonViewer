export const BaseObject = {
  slug: "diya-foundation",
  name: "Diya Foundation",
  registration_number: "386/98-99",
  auditor_name: "Das Kumar And Company",
  created_at: "2013-02-08T09:28:51.000Z",
  updated_at: "2020-02-25T06:11:35.814Z",
  external_profiles: [
    {
      label: "Website",
      uri: "http://www.diyafoundation-india.org/Site/index.html",
    },
    {
      label: "Youtube",
      uri: "http://www.youtube.com/watch?v=DezbmReWMf0",
    },
  ],
  tags: ["hoh18", "lfc19", "tbpp", "housie19", "gfc2020", "housie18"],
};

export const JSONPatch = [
    {
      op: "replace",
      path: "/tags/5",
      value: "spbm18",
    },
    {
      op: "replace",
      path: "/tags/4",
      value: "bengaluru10k-18",
    },
    {
      op: "add",
      path: "/external_profiles/2",
      value: {
        label: "Youtube",
        uri: "http://www.youtube.com/watch?v=DezbmReWMf0",
      },
    },
    {
      op: "replace",
      path: "/external_profiles/1/label",
      value: "Facebook",
    },
  
    // more patch operations...
  ];
  
  export const AfterBaseObject = {
    slug: "diya-foundation",
    name: "Diya Foundation",
    registration_number: "386/98-99",
    auditor_name: "Das Kumar And Company",
    created_at: "2013-02-08T09:28:51.000Z",
    updated_at: "2020-02-25T06:11:35.814Z",
    external_profiles: [
      {
        label: "Website",
        uri: "http://www.diyafoundation-india.org/Site/index.html",
      },
      {
        label: "Youtube",
        uri: "http://www.youtube.com/watch?v=DezbmReWMf0",
      },
    ],
    tags: ["hoh18", "lfc19", "tbpp", "housie19", "gfc2020", "housie18"],
  };
  