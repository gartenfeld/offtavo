## Background

The mapping files (`tr_offset_######.json, ...`) containing header text add up to 1.1GB uncompressed. The file `.data/offset_map.json` keeps the minimal information necessary to perform the look up, and has the following format:

```json
{
  "1000000105": [
    [318, 16532, 28165 /* ... */],
    [54, 112, 149 /* ... */]
  ],
  "1000000106": [
    [258, 1933 /* ... */],
    [52, 139 /* ... */]
  ]
  /* ... */
}
```

The lookup map is keyed by document ID, each value is a tuple of two arrays (always of the same length).

- The first array is a list of "offset milestones".
- The second array is a corresponding list of offset adjustments that should be applied after each "milestone".

The adjustment value provided is "cumulative", it includes all the adjustments up to the next "milestone", not just the length of the last header. Thus, to calculate how much "shift" should be added to get the Octavo offset, we find the furthermost "milestone" that the normal-text offset has surpassed, and add the corresponding adjustment.

In the above example, within document `"1000000105"`, given say, non-Octavo offset `20000`, it is larger than (`gte`) the "milestone" `16532` (but less than the next "milestone" `28165`), so we add the adjustment corresponding to `16532` (at index `[1]`), which is `112` (at index `[1]`) in the second array.

> Mikko Kivistö mentioned two things about the mapping files
>
> - Document IDs are to be padded with leading zeroes
> - Some document IDs appear more than once in multiple mapping files
>
> Here, both are ignored. If it causes trouble, we can look into that more closely.

## API

The `POST` endpoint `/octavify` accepts a request body in JSON:

```json
[
  { "id": "1000000105", "offsets": [20000] },
  { "id": "1000000106", "offsets": [1000] }
  // ...
]
```

The request payload is an array of objects, each with two fields:

- `id`: document ID (`string`)
- `offsets`: list (`number[]`) of non-Octavo offsets to be converted

The response is a JSON array in the same shape, only that the offsets are now converted to Octavo offsets:

```json
[
  { "id": "1000000105", "offsets": [20112] },
  { "id": "1000000106", "offsets": [1052] }
  // ...
]
```

Try it with cURL:

```shell
curl --location --request POST '<host>/octavify' \
--header 'Content-Type: application/json' \
--data-raw '[
    {
        "id": "1000000105",
        "offsets": [20000, 30000, 50000]
    }
]'
```

## Deployment

This repo is deployable as a Docker image on Rahti, see `Dockerfile` for details.
