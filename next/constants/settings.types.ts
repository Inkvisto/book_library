export interface ColorAsset {
    'day':string,
    'sepia_contrast':string
  }

    /*
      const color_mode = useSettingsStore((state) => (state.color_mode));
      const color_asset: ColorAsset = {
        'day':
          `body {
            background-color: #FEFCF3;
          }`,
        'sepia_contrast':
          `body {
          background-color: #EEE3CB;
        }`
      }
  
        <style jsx global>
           {`${color_asset[color_mode as keyof ColorAsset]}`}
       </style>
  */