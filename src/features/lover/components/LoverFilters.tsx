import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Grid,
  SelectChangeEvent,
  Select,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Button,
} from "@mui/material";
import React, { ChangeEvent, useRef } from "react";
import { City, ListParams } from "../../../models";

export interface LoverFiltersProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function LoverFilters({
  filter,
  onSearchChange,
  onChange,
  cityList,
}: LoverFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (
    e: SelectChangeEvent<{ value: unknown; name?: string }>
  ) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (
    e: SelectChangeEvent<{ name?: string; value: unknown}>
  ) => {
    if (!onChange) return;

    const value = e.target.value;
    const [_sort, _order] = (value as string).split(".");
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as "asc" | "desc") || undefined,
    };
    onChange(newFilter);
  };
  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);
    if (searchRef.current) {
      searchRef.current.value = "";
    }
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="searchByName">T??m Ki???m T??n</InputLabel>
            <OutlinedInput
              id="searchByName"
              label="T??m Ki???m T??n"
              endAdornment={<Search />}
              defaultValue={filter.name_like}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2.5}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">T??m Ki???m Th??nh Ph???</InputLabel>
            <Select
              labelId="filterByCity"
              value={filter.city || ""}
              label="T??m Ki???m Th??nh Ph???"
              onChange={handleCityChange}
            >
              <MenuItem value="">
                <em>T???t C???</em>
              </MenuItem>

              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>
                  {city.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">S???p X???p</InputLabel>
            <Select
              labelId="sortBy"
              value= {(filter._sort ? `${filter._sort}.${filter._order}` : '') as any}
              onChange={handleSortChange}
              label="S???p X???p"
            >
              <MenuItem value="">
                <em>...Ch???n</em>
              </MenuItem>

              <MenuItem value="name.asc">S???p X???p T??n T??ng D???n</MenuItem>
              <MenuItem value="name.desc">S???p X???p T??n Gi???m D???n</MenuItem>
              <MenuItem value="mark.asc">S???p X???p ??i???m Khu??n M???t T??ng D???n</MenuItem>
              <MenuItem value="mark.desc">S???p X???p ??i???m Khu??n M???t Gi???m D???n</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1.5}>
          <Button
            variant="outlined"
            color="primary"
            size = "medium"
            fullWidth
            onClick={handleClearFilter}
          >
            L??m M???i
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
