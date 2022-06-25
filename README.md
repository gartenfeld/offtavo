## Background

The mapping files (`tr_offset_######.json, ...`) containing header text add up to 1.1GB uncompressed. The file `.data/offset_map.json` keeps the minimal information necessary to perform the look up, and has the following format:

```json
{
  "": [[], []],
  "": [[], []],
  ...
}
```

The lookup map is keyed by document ID, each value is a tuple of two arrays (always of the same length).

- The first array is a list of "offset milestones".
- The second array is a corresponding list of offset adjustments that should be applied after each "milestone".

The adjustment value provided is "cumulative", it includes all the adjustments up to the next "milestone", not just the length of the last header. Thus, to calculate how much "shift" should be added to get the Octavo offset, we find the furthermost "milestone" that the normal-text offset has surpassed, and add the corresponding adjustment.

In the above example, within document `ID`, given say, non-Octavo offset `x`, it is larger than (`gte`) the "milestone" `y` (but less than the next "milestone" `y'`), so we add the adjustment corresponding to `y`, which is `z` in the second array.

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
  { "id": "", "offsets": [] },
  { "id": "", "offsets": [] },
  ...
]
```

The request payload is an array of objects, each with two fields:

- `id` (`string`): document ID
- `offsets` (`number[]`): list of non-Octavo offsets to be converted

The response is a JSON array in the same shape, only that the offsets are now converted to Octavo offsets:

```json
[
  { "id": "", "offsets": [] },
  { "id": "", "offsets": [] },
  ...
]
```
