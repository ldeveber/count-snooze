import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import { useEffect, useState } from "react";
import { Hue } from "src/themes";
import { ColorOptions, defaultColor } from "src/utils/options";
import CustomColor from "./CustomColor";
import ThemeMode from "./ThemeMode";

export const ColorLoading = () => {
  return (
    <Card variant="outlined">
      <CardHeader
        action={
          <Skeleton>
            <Switch />
          </Skeleton>
        }
        title={<Skeleton variant="text" />}
        subheader={<Skeleton variant="text" />}
      />
      <CardContent>
        <Skeleton variant="rounded" height={80} width={560} />
      </CardContent>
    </Card>
  );
};

const setThemeMode = async (themeMode: ColorOptions["themeMode"]) => {
  await chrome.storage.sync.set({ themeMode });
};

const setCustomTheme = async (hue: Hue) => {
  await chrome.storage.sync.set({ isCustomTheme: true, hue });
};

const setDefaultTheme = async () => {
  await chrome.storage.sync.set({
    isCustomTheme: false,
  });
  await chrome.storage.sync.remove(["hue"]);
};

export default function ThemeOptions() {
  const [options, setOptions] = useState<ColorOptions>(defaultColor);

  useEffect(() => {
    void chrome.storage.sync.get(defaultColor).then((values) => {
      setOptions(values as ColorOptions);
    });
  }, []);

  useEffect(() => {
    if (options.isCustomTheme) {
      void setCustomTheme(options.hue);
    } else {
      void setDefaultTheme();
    }
  }, [options.isCustomTheme, options.hue]);

  useEffect(() => {
    setThemeMode(options.themeMode);
  }, [options.themeMode]);

  return (
    <Card variant="outlined">
      <CardHeader title="Theme" subheader="Customize look and feel" />
      <CardContent>
        <Stack spacing={4}>
          <ThemeMode options={options} setOptions={setOptions} />
          <CustomColor options={options} setOptions={setOptions} />
        </Stack>
      </CardContent>
    </Card>
  );
}
