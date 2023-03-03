# Fixing IMEI (SSDT-IMEI)

[[toc]]

## What this SSDT does

The purpose of SSDT-IMEI is:

* When mixing Ivy Bridge CPUs with 6 series motherboard, we get an issue where the IMEI device becomes incompatible with macOS. Specifically the device-id won't be recognized and this is a very important issue as macOS relies on the IMEI device for iGPU drivers.
  * The same applies when mixing Sandy Bridge motherboards with 7 series motherboards
* An extra issue that may pop up is that the IMEI won't appear in ACPI, which can lead to more issues as macOS expects there to be an ACPI device to apply device-id's. So to resolve, we'll want to verify if we have an IMEI device, and if not create a new device.

## Methods to make this SSDT

For the IMEI fix, there are 2 methods you can choose from:

* [Prebuilt](#prebuilt)
  * The prebuilt are a bit bloated. It's recommended to use the method below.
* [Manual](#manual)

### Prebuilt

By far the easiest method, all you need to do is download the following file:

* [SSDT-IMEI.aml](https://github.com/macos86/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-IMEI.aml)

### Manual

#### Finding the ACPI device

Finding the ACPI pathing is quite easy actually, first open your decompiled DSDT you got from [Dumping the DSDT](../dump.md) and [Decompiling and Compiling](../compile.md) with either MaciASL(if in macOS) or any other text editor if in Windows or Linux (VSCode has an [ACPI extension](https://marketplace.visualstudio.com/items?itemName=Thog.vscode-asl) that can also help).

Next, search for the following devices:

* `IMEI`
* `HECI`
* `MEI`

If none of the 3 show up, you'll need to create an SSDT-IMEI.

**If one of these 3 devices show up**, you do not need SSDT-IMEI! You can simply skip this page.

The rest of this page will however assume none of those 3 devices showed up.

#### Compiling the SSDT

So there's actually no edits required to SSDT-IMEI, you can either grab the source code and compile yourself or use the prebuilt

* [Prebuilt SSDT-IMEI](https://github.com/macos86/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-IMEI-S.aml)

* [SSDT-IMEI's source code](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-IMEI.dsl)

## Wrapping up

Once you're done making your SSDT, either head to the next page to finish the rest of the SSDTs or head here if you're ready to wrap up:

* [**Cleanup**](/cleanup.md)
