#pragma once

#include <juce_gui_basics/juce_gui_basics.h>
#include <juce_audio_processors/juce_audio_processors.h>


class BaseComponent : public juce::Component
{
public:
    BaseComponent() = default;
    virtual ~BaseComponent() = default;

    // Called when the component is shown
    virtual void loadState() = 0;

    // Called before switching away from this component
    virtual void saveState() = 0;

    void paint(juce::Graphics& g) override
    {
        g.fillAll(juce::Colours::darkgrey);
    }

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(BaseComponent)
};
