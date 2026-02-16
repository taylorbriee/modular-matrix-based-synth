#pragma once
#include <juce_gui_basics/juce_gui_basics.h>

class TextComponent : public juce::Component
{
public:
    TextComponent(const juce::String& text);
    void paint(juce::Graphics& g) override;

private:
    juce::String labelText;
};

