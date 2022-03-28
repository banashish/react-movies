import React from "react";

const SettingsContext = React.createContext({
    config_url: '',
    backdrop_sizes: [],
    search_key: '',
    set_search_key: () => {}
})

export default SettingsContext;