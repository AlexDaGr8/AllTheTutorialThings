// namespaces that extend enums with static methods

enum Color {
     red = 'scarlet',
     green = 'emerald',
     blue = 'sky',
}

namespace Color {
    export function mixColor(colorName: string): string {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "purple") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        } else {
            return colorName + ' does not exist'
        }
    }
}