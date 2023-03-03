# Fixing Uncore Bridges (SSDT-UNC)

[[toc]]

## What this SSDT does

This SSDT is required for all X99 and many X79 boards, it specifically disables unused devices in ACPI ensuing IOPCIFamily doesn't kernel panic. This requires very little configuration for the end user.

* X79
* C602
* X99
* C612

## Methods to make this SSDT

The main ways to make this SSDT:

* [Prebuilt](#prebuilt)
* [Manual](#manual)

### Prebuilt

By far the easiest method, all you need to do is download the following file:

* [SSDT-UNC.aml](https://github.com/macos86/Getting-Started-With-ACPI/blob/master/extra-files/compiled/SSDT-UNC.aml)

### Manual

Super simple, just grab the SSDT and compile:

* [SSDT-UNC.dsl](https://github.com/acidanthera/OpenCorePkg/tree/master/Docs/AcpiSamples/Source/SSDT-UNC.dsl)

See here how to compile: [Compiling ACPI](../compile.md)

## Wrapping up

Once you're done making your SSDT, either head to the next page to finish the rest of the SSDTs or head here if you're ready to wrap up:

* [**Cleanup**](../cleanup.md)
